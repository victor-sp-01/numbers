import ModalApp from "../lib/ModalApp.js"
import OpcGenerate from "../components/OpcGenerate.js"
import ListGenertateNumber from "../components/ListGenertateNumber.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"

const Generate =()=>{
    const { limitRangeGenerate } = JSON.parse(getLocalStorage( 'DataNumber', '[{}]' ))  

    const Data = {
        lengthNumber : limitRangeGenerate,
        helps       : 0,

        number  : [],
        numberUsed  : [],

        timeGenerate : null,
        timeGenerateStop : null,

        btnGenerate : false,
        btnPlay : false, 
    }

    const $Element = new ModalApp({
        header : (`
            <div class="div__WrxW0" >
                <button class="button__UpLE7 after div-ybnksmvzJygjL2Z" data-action="resetGame" ><i class="fa-solid fa-repeat"></i></button>
                <button class="button__UpLE7 after div-ybnksmvzJygjL2Z" data-action="opcGame" ><i class="fa-solid fa-gear"></i></button>
            </div>
        `),
        body : (`
            <form class="form__FQKwi" autocomplete="off" >
                <input type="text" name="number" value="999" readonly >

                <div class="div__f1GW0" >
                    <button type="button" class="after button-kqxgewImFbBDeHE" data-action="btnList" ><i class="fa-solid fa-list-ul"></i></button>
                    <button type="button" class="after button-kqxgewImFbBDeHE" data-action="btnPlay" ><i class="fa-solid fa-play"></i></button>
                </div>
            </form>
        `)
    })
    

    $Element.create( { classID : '#main' } )

    const generarNumber =()=>{  
        
        if( document.body.contains( $Element.element ) ) {
            if( Data.number.length !== 0 ){
                const num = Data.number[ Math.floor( Math.random() * Data.number.length ) ] 
                Element.number.value = `${ num < 10 ? '00' : num < 100 ? '0' : '' }` + num
                return num
            }
        } else return clearTimes()
 
    }

    const numInterval =()=>{
        clearTimes()  
        Data.btnPlay = false
        Data.number = [ ...Array( Data.lengthNumber + 1 ).keys() ].filter( i => ( !Data.numberUsed.includes( i ) ) && ++i )
        
        if( Data.number.length === 0 ) return

        Data.timeGenerate = setInterval( generarNumber , 50);
        Data.timeGenerateStop = setTimeout( ()=> { 

            Data.btnGenerate = true
            Data.btnPlay = true
            clearInterval( Data.timeGenerate ) 
            Data.numberUsed.push( generarNumber() )

        }, 1000 ) 
    }

    const GameReset =()=>{
 
        Data.numberUsed = [] 
        clearTimes()
        numInterval() 

    }

    const clearTimes =()=>{
        clearInterval( Data.timeGenerate )
        clearTimeout( Data.timeGenerateStop )
    }

    setTimeout( numInterval )

    const Element = $Element.findChildren( '.form__FQKwi' )

    Element.addEventListener( 'click', e =>{
        if( e.target.classList.contains( 'button-kqxgewImFbBDeHE' ) ){
            if( e.target.dataset.action === 'btnList' ){
                return ListGenertateNumber( Data.numberUsed )
            } 
            else if( e.target.dataset.action === 'btnPlay' ){
                if( !Data.btnPlay ) return
                return numInterval()
            }
        }
    })

    Element.addEventListener( 'submit', e =>{
        e.preventDefault()
    })

    $Element.findChildren( '.div__WrxW0' ).addEventListener( 'click', e =>{
        if( e.target.classList.contains( 'div-ybnksmvzJygjL2Z' ) ){
            if( e.target.dataset.action === 'resetGame' ) return GameReset()
            if( e.target.dataset.action === 'opcGame' ) return OpcGenerate()

        }
    })
}

export default Generate
