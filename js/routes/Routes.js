import { Hash } from "../helpers/Params.js"

import Inicio from "../pages/Inicio.js"
import Number from "../pages/Number.js"
import Generate from "../pages/Generate.js"

import PageNotFound from "../pages/PageNotFound.js"

const Routes =()=>{
    const [ ruta = false ] = Hash() 

    if( ruta === false ) return Inicio()
    else if( ruta === 'number' ) return Number()
    else if( ruta === 'generate' ) return Generate()
    else return PageNotFound()
}

export default Routes
 