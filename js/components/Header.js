import Element from "../lib/Element.js"
import OpcOpciones from "./OpcOpciones.js"

const Header =()=>{

    const $Element = new Element({
        element : (`
            <header class="header__71622" >
                <button class="button__L2Orh" ><i class="fa-solid fa-grip-lines"></i></button>
            </header>
        `)
    })

    $Element.create({ classID : '#root' })

    $Element.findChildren( '.button__L2Orh' ).addEventListener( 'click', ()=> {
        OpcOpciones()
    }) 
}

export default Header