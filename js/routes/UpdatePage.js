import style from "../styles/style.js"

import Background from "../components/Background.js"

import Header from "../components/Header.js"
import Main from "../components/Main.js"

const UpdatePage =()=>{
    document.getElementById( 'root' ).textContent = '' 

    style()
    Background()
    location.hash === '' && Header()
    Main()
}

export default UpdatePage