import Setting from "./settings/Setting.js"
import UpdatePage from "./routes/UpdatePage.js"

const App =()=>{

    const sw = (( nsw )=> (`${ location.host.includes( 'localhost' ) ? '' : '/' + location.pathname.split('/')[1] }/${ nsw }`))('sw.js')
    if( navigator.serviceWorker ) navigator.serviceWorker.register( sw )

    Setting()
    UpdatePage() 

    addEventListener( 'hashchange', UpdatePage )
    addEventListener( 'contextmenu', e => e.preventDefault() )
}

export default App