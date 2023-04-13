import Element from "../lib/Element.js" 
import Routes from "../routes/Routes.js"

const Main =()=>{
    
    const $Element = new Element({ main: { attributes : { class:'main', id:'main' }}})
    $Element.create( { classID : '#root' } ) 

    Routes()
}

export default Main