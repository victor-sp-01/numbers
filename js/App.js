import Setting from "./settings/Setting.js"
import UpdatePage from "./routes/UpdatePage.js"

const App =()=>{

    const sw = (( nsw )=> (`${ location.host.includes( 'localhost' ) ? '' : '/' + location.pathname.split('/')[1] }/${ nsw }`))('sw.js')
    if( navigator.serviceWorker ) navigator.serviceWorker.register( sw )

    Setting()
    UpdatePage() 

    //NOTIFICATION

    const sendNotification =()=>{
        const notificacionOPC = {
            body : 'this is notification´s body',
            icon : 'img/assets/icons/icon-72x72.png'
        }

        const notification = new Notification( 'hola mundo', notificacionOPC )
        notification.onclick =()=>{
            //console.log( 'click' )
        }
    }

    const notification = ()=>{
        if( !Notification )
            return console.log( 'notification is not actived' )

        if( Notification.permission === 'granted' ){
            //sendNotification()
        } else if ( Notification.permission !== 'denied' || Notification.permission === 'default' ){
            Notification.requestPermission(( permission )=>{
                if( permission === 'granted' ){
                    sendNotification()
                }
            })
        }
    };  //notification()

    addEventListener( 'hashchange', UpdatePage )
    addEventListener( 'contextmenu', e => e.preventDefault() )
}

export default App