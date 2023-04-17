import { getLocalStorage } from "../api/apiLocalStorage.js"

const style =()=>{

    const datas = JSON.parse( getLocalStorage( 'Setting', 'false' ) ) 

    if( !datas ) return
 
    document.getElementById( 'styles' ).innerHTML = (`
        :root{
            --baseColor : ${ datas.color };
        }
    `)
 
}

export default style