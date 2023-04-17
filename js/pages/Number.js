import ModalApp from "../lib/ModalApp.js"
import OpcNumber from "../components/OpcNumber.js"
import { getLocalStorage } from "../api/apiLocalStorage.js"
import getDataNumber from "../data/getDataNumber.js"

const Number =()=>{

    const { typeGame = 'NUMBER', limitRange = 1000 , limitCasillas = 10 } = JSON.parse(getLocalStorage( 'DataNumber', '[{}]' ))

    const Data = {
        typeGame        : typeGame,
        lengthNumber    : limitRange,
        lengthLine      : limitCasillas,
        helps           : 1,

        number          : [],
        numberUsed      : [],
        numberSelected  : {},

        timeGenerate    : null,
        timeGenerateStop : null,

        btnGenerate : false,
        btnPlay : false,

        typeMode : getDataNumber( typeGame, limitRange )
    }

    const $Element = new ModalApp({
        header : (`
            <div class="div__WrxW0" >
                <button class="button__UpLE7 after div-ybnksmvzJygjL2Z" data-action="resetGame" ><i class="fa-solid fa-repeat"></i></button>
                <button class="button__UpLE7 after div-ybnksmvzJygjL2Z" data-action="opcGame" ><i class="fa-solid fa-gear"></i></button>
            </div>
        `),
        body : (`
            <form class="form__sKQFM" automcomplete="off" >
                <div class="div__ebNKi overflowY" >
                    <div class="div__KN7Ob" >
                        ${ [ ...Array( Data.lengthLine || 5 ).keys() ].map( data => {
                            return(`
                                <button type="button" class="button__ABYX4 after button-cugUzkTOmUoaNLx" >
                                    <span class="span__dbj8s" ></span>
                                    <span class="span__EwUoC" >${ ++data }</span>
                                </button>
                            `)
                        } ).join('') }
                    </div>
                </div>

                <input type="text" class="input__PVCmI input-hWY42lSpKOq1lcs" name="number" readonly >
            </form>
        `)
    })

    $Element.create( { classID : '#main' } )

    const generarNumber =()=>{  
        
        if( document.body.contains( $Element.element ) ) {
            if( Data.number.length !== 0 ){
                const num = Data.number[ Math.floor( Math.random() * Data.number.length ) ] 
                Element.number.value = `${ num.value < 10 ? '00' : num.value < 100 ? '0' : '' }` + num.value
                return num
            }
        } else return clearTimes()
 
    }

    const numInterval =()=>{  
        Data.btnPlay = false
        Data.number = Data.typeMode.filter( i => ( !Data.numberUsed.includes( i.id ) ) && i )

        if( Data.number.length === 0 ) return
        
        Data.timeGenerate = setInterval( generarNumber , 75);
        Data.timeGenerateStop = setTimeout( ()=> { 

            clearInterval( Data.timeGenerate )
            Data.numberSelected = generarNumber() 

            Data.btnGenerate = true
            Data.btnPlay = true

        }, 1000 ) 
    }

    const GameReset =()=>{
        const buttons = Element.querySelectorAll( '.div__KN7Ob .button__ABYX4' )

        for( const [ index, button ] of buttons.entries() ){
            button.querySelector( '.span__EwUoC' ).textContent = index + 1
            button.classList = 'button__ABYX4 after button-cugUzkTOmUoaNLx'
            button.value = ''
        }

        Data.numberUsed = [] 
        Data.helps = 1
        clearTimes()
        numInterval() 
    }

    const clearTimes =()=>{
        clearInterval( Data.timeGenerate )
        clearTimeout( Data.timeGenerateStop )
    }

    const pushNumer =( target )=>{
        const span = target.querySelector( '.span__EwUoC' )

        target.classList.add( 'complete' )
        target.value = Data.numberSelected.id
        span.textContent = Data.numberSelected.value  

        Data.numberUsed.push( +target.value  )
        Data.validate = []

        
        const buttons = Element.querySelectorAll( '.div__KN7Ob .button__ABYX4.complete' )
        
        for( const [ index, button ] of buttons.entries() ) if( button.value !== '' ) {
            if( buttons[ index + 1 ] ) {
                if( +button.value > +buttons[ index + 1 ].value ){
                    target.classList.add( 'error' )
                    Data.btnGenerate = Data.btnPlay = false
                    return  
                }
            } 
        }

        if( buttons.length === Data.lengthLine ){ 
            target.classList.add( 'finish' )
            Data.btnGenerate = Data.btnPlay = false
            return setTimeout( ()=> alert( 'ps si se pudo, Buena...✨✨' ), 500 ) 
        }

        numInterval()
    }

    setTimeout( numInterval )

    const Element = $Element.findChildren( '.form__sKQFM' ) 

    Element.addEventListener( 'click', (e)=>{

        const target = e.target

        if( target.classList.contains( 'input-hWY42lSpKOq1lcs' ) ){
            if( !Data.btnGenerate || Data.helps <= 0 ) return
            Data.helps--
            clearTimes()
            numInterval()
            return
        }

        else if( target.classList.contains( 'button-cugUzkTOmUoaNLx' ) ){
            if( !Data.btnPlay ) return
            pushNumer( target ) 
            return
        }

    })
    
    Element.addEventListener( 'click', e => e.preventDefault() )

    $Element.findChildren( '.div__WrxW0' ).addEventListener( 'click', e =>{
        if( e.target.classList.contains( 'div-ybnksmvzJygjL2Z' ) ){
            if( e.target.dataset.action === 'resetGame' ) return GameReset()
            else if( e.target.dataset.action === 'opcGame' ) return OpcNumber()
        }
    })

}

export default Number
