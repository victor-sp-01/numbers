importScripts('js/helpers/sw-utils.js')

const CACHE_STATIC_NAME     = 'static-v3'
const CACHE_DYNAMIC_NAME    = 'dynamic-v1'
const CACHE_INMUTABLE_NAME  = 'inmutable-v1'

const APP_SHELL = [
    //'/',
    'index.html',
    'css/style.css',
    'css/styles.css',
    'css/stylesResponsive.css',
    'img/favicon.png',
    'img/icons/no-content.png',
    'img/icons/no-data.png',
    'img/icons/number.png',
    'img/icons/ramdon.png',
    'img/other/cuadrado.png'
]

const APP_SHELL_INMUTABLE = [
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://kit.fontawesome.com/aaa143d91d.js'
]

self.addEventListener( 'install', e => {
    const cacheStatic = async ()=>{
        const cache = await caches.open(CACHE_STATIC_NAME)
        return cache.addAll( APP_SHELL ) 
    }

    const cacheInmutable = async ()=>{
        const cache = await caches.open(CACHE_INMUTABLE_NAME)
        return cache.addAll( APP_SHELL_INMUTABLE )
    }

    e.waitUntil( Promise.all([ cacheStatic(), cacheInmutable() ]) );
})

self.addEventListener( 'activate', e => {

    const respuesta = caches.keys()
        .then( keys => {
            keys.forEach( key => {
                if( key !== CACHE_STATIC_NAME  && key.includes('static')  ){
                    return caches.delete(key)
                }
            })
        })

    e.waitUntil(respuesta)

})

self.addEventListener( 'fetch', e =>{

    const respuesta = async ()=>{
        const cache = await caches.match( e.request )
        if( cache ) return cache
 
        return fetch( e.request )
            .then( newRes => {
                return updateCacheDynamic( CACHE_DYNAMIC_NAME, e.request, newRes )
            })
    }

    e.respondWith( respuesta() )
})
