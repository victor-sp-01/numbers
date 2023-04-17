importScripts('js/helpers/sw-utils.js')

const CACHE_STATIC_NAME     = 'static-v2023.04.17.24.02'
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
    'img/other/cuadrado.png',
    'img/assets/icons/icon-48x48.png',
    'img/assets/icons/icon-72x72.png',
    'img/assets/icons/icon-96x96.png',
    'img/assets/icons/icon-128x128.png',
    'img/assets/icons/icon-144x144.png',
    'img/assets/icons/icon-152x152.png',
    'img/assets/icons/icon-192x192.png',
    'img/assets/icons/icon-284x284.png',
    'img/assets/icons/icon-512x512.png',
    'img/backgrounds/1.jpg',
    'img/backgrounds/2.jpg',
    'img/backgrounds/3.jpg',
    'img/backgrounds/4.jpg',
    'img/backgrounds/5.jpg',
    'img/backgrounds/6.jpg',
    'img/backgrounds/7.jpg',
    'img/backgrounds/8.jpg',
    'img/backgrounds/9.jpg',
    'img/backgrounds/10.jpg',
    'img/backgrounds/11.jpg',
    'img/backgrounds/12.jpg',
    'img/backgrounds/13.jpg',
    'img/backgrounds/14.jpg',
    'img/backgrounds/15.jpg',
    'img/backgrounds/16.jpg',
    'img/backgrounds/17.jpg',
    'img/backgrounds/18.jpg',
    'img/backgrounds/19.jpg',
    'img/backgrounds/20.jpg',
    'img/backgrounds/21.jpg',
    'img/backgrounds/22.jpg',
    'img/backgrounds/23.jpg',
    'manifest.json'
]

const APP_SHELL_INMUTABLE = [
    //'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    //'https://kit.fontawesome.com/aaa143d91d.js'
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

        const fileJS = /\.(js)$/i.test( e.request.url )

        if( cache ) { 

            if( navigator.onLine )
                if( fileJS )
                    fetch( e.request ).then( newRes => updateCacheDynamic( CACHE_DYNAMIC_NAME, e.request, newRes ) )

            return cache
        } 

        if( fileJS )  
            return fetch( e.request ).then( newRes => updateCacheDynamic( CACHE_DYNAMIC_NAME, e.request, newRes ))
        
        return fetch( e.request )
    }

    e.respondWith( respuesta() )
})

 
