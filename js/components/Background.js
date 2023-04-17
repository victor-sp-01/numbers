import Element from "../lib/Element.js" 
import { createLocalStorage } from "../api/apiLocalStorage.js"

const Background =()=>{

    const Setting = JSON.parse( createLocalStorage( 'Setting', JSON.stringify({
        color   : '#5478a4',
        colors  : ['#f5f8de', '#c2a878', '#70798c', '#96adc8', '#ff6b6c', '#85baa1', '#88d9e6'],
        photo   : '1',
        photos  : [ ...Array( 2 ).keys() ].map( i => (`${ ++i }`) ),
        noteOrder : 'month'
    })))

    const $Element = new Element({
        element : (`
            <div class="div__UDDC0" style="background : ${ Setting.color }" >
                ${ Setting.photo !== '' ? `<img src="./img/backgrounds/${ Setting.photo }.jpg" >` : '' }
            </div>
        `)
    })

    $Element.create({ classID : '#root', begin : true })

 

}

export default Background