import style from "../styles/style.js"
import Main from "../components/Main.js"

const UpdatePage =()=>{
    document.getElementById( 'root' ).textContent = '' 

    style()
    Main()
}

export default UpdatePage