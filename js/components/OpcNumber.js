import UpdatePage from "../routes/UpdatePage.js";
import ModalOption from "../lib/ModalOption.js";
import { getLocalStorage } from "../api/apiLocalStorage.js";

const OpcNumber =()=>{

    const DataNumber = JSON.parse(getLocalStorage( 'DataNumber', '{}' )) 
    const Setting = JSON.parse(getLocalStorage( 'Setting', '{}' )) 


    const Option = [
        {
            text    : 'numeros',
            action  : 'btnNumbers',
            icon    : '<i class="fa-solid fa-arrow-up-1-9"></i>'
        },
        {
            text    : 'casillas',
            action  : 'btnCasillas',
            icon    : '<i class="fa-solid fa-lines-leaning"></i>'
        },
        {
            text    : 'color',
            action  : 'btnColor',
            icon    : '<i class="fa-solid fa-palette"></i>'
        } 
    ]


    const Options = {
        btnNumbers : {
            events : {
                '.form__tjs6q' : {
                    click : e =>{

                        if( e.target.classList.contains( 'btn-FdvhPbmQRiacIRG' ) ){
                            const input = e.target.form.limitRange

                            if( e.target.dataset.action === 'btnLess' )
                                return input.value = ((number)=>{
                                    --number
                                    number = number < DataNumber.limitCasillas ? 10000 : number
                                    number = number || DataNumber.limitCasillas
                                    

                                    return number
                                })( input.value  )

                            else if( e.target.dataset.action === 'btnAdd' )
                                return input.value = ((number)=>{
                                    ++number
                                    number = number > 10000 ? DataNumber.limitCasillas : number
                                    number = number || DataNumber.limitCasillas

                                    return number
                                })( input.value  )
                        } 

                    },
                    submit : e => {
                        e.preventDefault()

                        DataNumber.limitRange = ((number)=>{
                            number = +number
                            number = number < DataNumber.limitCasillas ? 10000 : number
                            number = number > 10000 ? DataNumber.limitCasillas : number
                            number = number || DataNumber.limitCasillas

                            return number
                        })(e.target.limitRange.value) 

                        localStorage.setItem( 'DataNumber', JSON.stringify( DataNumber ) )

                        $Element.delete()
                        UpdatePage()
                    }
                } 
            },
            html    : (`
                <form class="form__tjs6q" autocomplete=off >
 
                    <div class="div__yJgoV">
                        <button type="button" class="button__Gzm4F after btn-FdvhPbmQRiacIRG" data-action="btnLess" ><i class="fa-solid fa-caret-left"></i></button>
                        <input type="number" class="input__bHvkr" name="limitRange" value="${ DataNumber.limitRange || 1000 }" placeholder="limite de rango" >
                        <button type="button" class="button__Gzm4F after btn-FdvhPbmQRiacIRG" data-action="btnAdd"  ><i class="fa-solid fa-caret-right"></i></button>
                    </div>

                    <button type="submit" class="button__Gzm4F" ><i class="fa-solid fa-check"></i></button>

                </form>
            `)
        },
        btnCasillas : {
            events : {
                '.form__tjs6q' : {
                    click : e =>{
                        if( e.target.classList.contains( 'btn-FdvhPbmQRiacIRG' ) ){
                            const input = e.target.form.limitCasillas
                            if( e.target.dataset.action === 'btnLess' )
                                return input.value = ((number)=>{
                                    --number
                                    number = number < 3 ? DataNumber.limitRange : number
                                    number = number || DataNumber.limitRange
                                    

                                    return number
                                })( input.value  )

                            else if( e.target.dataset.action === 'btnAdd' )
                                return input.value = ((number)=>{
                                    ++number
                                    number = number > DataNumber.limitRange ? 3 : number
                                    number = number || DataNumber.limitRange
                                    return number
                                })( input.value  )
                        } 
                    },
                    submit : e => {

                        e.preventDefault()

                        DataNumber.limitCasillas = ((number)=>{ 
                            number = +number

                            number = number > DataNumber.limitRange ? DataNumber.limitRange : number
                            number = number || DataNumber.limitRange
                            return number
                        })(e.target.limitCasillas.value) 

                        localStorage.setItem( 'DataNumber', JSON.stringify( DataNumber ) )

                        $Element.delete()
                        UpdatePage()  
                    }
                } 
            },
            html    : (`
                <form class="form__tjs6q" autocomplete=off >
                    

                    <div class="div__yJgoV">
                        <button type="button" class="button__Gzm4F after btn-FdvhPbmQRiacIRG" data-action="btnLess" ><i class="fa-solid fa-caret-left"></i></button>
                        <input type="number" class="input__bHvkr" name="limitCasillas" value="${ DataNumber.limitCasillas || 10 }" placeholder="limite de casillas" >
                        <button type="button" class="button__Gzm4F after btn-FdvhPbmQRiacIRG" data-action="btnAdd"  ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                    <button type="submit" class="button__Gzm4F" ><i class="fa-solid fa-check"></i></button>

                </form>
            `)
        },

        btnColor : { 
            events:{
                '.form__IM87L' : {
                    change : (e)=>{
                        if( e.target.id === 'newColor' )
                            return e.target.parentElement.style.background = e.target.value
                    },
                    submit : e => {
                        e.preventDefault()

                        Setting.color = e.target.newColor.value
                        localStorage.setItem( 'Setting', JSON.stringify( Setting ) )

                        $Element.delete()
                        UpdatePage()
                    }
                }
            },
            html :  (`
                    <form class="form__IM87L" autocomplete=off >
                        <label class="label__15VqS" style="background : ${ Setting.color }" for="newColor" >
                            <input type="color" id="newColor" value="${ Setting.color }" >
                            <span>${ Setting.color }</span>
                        </label>
                        <button type="submit" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="changeColor" ><i class="fa-solid fa-arrow-right"></i></button>
                    </form> 
                `) 
        }

    }

   

    const $Element = new ModalOption({ option : Option, options : Options })
    $Element.create({ classID : '#root' })

}

export default OpcNumber


 /*
    const Options = {
        btnNumbers : {
            event : (e)=>{
                console.log( e )

                console.log( e.target.offsetParent )
                
            },

            html : ()=>{
 
                const limitRange = DataNumber.limitRange || 1000

                return(`
                    <form class="form__tjs6q" autocomplete off >
                        <input type="text" class="input__bHvkr" value="${ limitRange }" placeholder="limite de rango" >
                        <div class="div__yJgoV">
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-caret-left"></i></button>
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-check"></i></button>
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-caret-right"></i></button>
                        </div>
                    </form>
                `)
            } 
        },
//
        btnCasillas : {
            event : ()=>{
                console.log( 'btnCasillas' )

            },
            html : ()=> {
 
                const limitCasillas = DataNumber.limitCasillas || 10

                return (`
                    <form class="form__tjs6q" autocomplete off >
                        <input type="text" class="input__bHvkr" value="${ limitCasillas }" placeholder="limite de casillas" >
                        <div class="div__yJgoV">
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-caret-left"></i></button>
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-check"></i></button>
                            <button type="button" class="button__Gzm4F" ><i class="fa-solid fa-caret-right"></i></button>
                        </div>
                    </form>
                `)
            }
        },

        btnColor : {
            event : ()=>{

                console.log( 'btnColor' )
            },
            html : ()=> {
                return(`
                    <div class="div__tjs6q" >
                        <input type="color" > 
                    </div>
                `)
            }
        } 
    }*/

/*/*
    const option = (`
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnNumbers" >
            <i class="fa-solid fa-arrow-up-1-9"></i>
            <span>numeros</span>
        </button>
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnCasillas" >
            <i class="fa-solid fa-lines-leaning"></i>
            <span>casillas</span>
        </button>
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnColor" >
            <i class="fa-solid fa-palette"></i>
            <span>color</span>
        </button>
    `)
    const $Element = new ModalOption({
        event : (e)=>{
            if( e.target.classList.contains( 'button-PZovctOa1d3bZHE' ) ){
                $Element.options( Options[ e.target.dataset.option ] ) 
            }
        },
        option : (`
            <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnNumbers" >
                <i class="fa-solid fa-arrow-up-1-9"></i>
                <span>numeros</span>
            </button>
            <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnCasillas" >
                <i class="fa-solid fa-lines-leaning"></i>
                <span>casillas</span>
            </button>
            <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnColor" >
                <i class="fa-solid fa-palette"></i>
                <span>color</span>
            </button>
        `)
    })

    $Element.create({ classID : '#root' }) 

 
    const Options = {
        btnNumbers : {
            event : ()=>{
                console.log( 'numeros' )
            },
            html : (`
                <div class="div__tjs6q" >
                    <input type="text" placeholder="limite de rango" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
            `)
        },

        btnCasillas : {
            event : ()=>{
                console.log( 'btnCasillas' )

            },
            html : (`
                <div class="div__tjs6q" >
                    <input type="text" placeholder="limite de casillas" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div> 
                </div>
            `)
        },

        btnColor : {
            event : ()=>{

                console.log( 'btnColor' )
            },
            html : (`
                <div class="div__tjs6q" >
                    <input type="color" > 
                </div>
            `)
        }
    }

    /*
    const Option = {
        btnNumbers : $Element.options({
            event : ()=>{  },
            html : (`
                <div class="div__tjs6q" >
                    <input type="text" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
            `)
        }),

        btnCasillas : $Element.options({
            event : ()=>{  },
            html : (`
                <div class="div__tjs6q" >
                    <input type="text" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
            `)
        }),

        btnColor : $Element.options({
            event : ()=>{  },
            html : (`
                <div class="div__tjs6q" >
                    <input type="text" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
            `)
        })
    }

    /*
    const [ modalElement, hideModalElement ] = ModalOption(`
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnNumbers" >
            <i class="fa-solid fa-arrow-up-1-9"></i>
            <span>numeros</span>
        </button>
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnCasillas" >
            <i class="fa-solid fa-lines-leaning"></i>
            <span>casillas</span>
        </button>
        <button type="button" class="button__3yg4wyD button-PZovctOa1d3bZHE" data-option="btnColor" >
            <i class="fa-solid fa-palette"></i>
            <span>color</span>
        </button>
    `)

    const Options = {
        btnNumbers : ()=>{


            return (`
                <div class="div__tjs6q" >
                    <input type="text" >
                    <div>
                        <button type="button" ><i class="fa-solid fa-caret-left"></i></button>
                        <button type="button" ><i class="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
            `)
        },
        btnCasillas : ()=>{
            return (`
                <span>contenido </span>
            `)
        },
        btnColor : ()=>{
            return (`
                <span>contenido</span>
            `)
        },
    }

    const action =(e)=>{
        if( e.target.classList.contains( 'button-PZovctOa1d3bZHE' ) ){
            modalElement.querySelector( '.div__FqNPnEf' ).classList.add( 'options' )
            //modalElement.querySelector( '.div__36kh8rO' ).innerHTML = Options[ e.target.dataset.option ]()
        }
    }

    modalElement.addEventListener( 'click', action )
    //modalElement.removeEventListener( 'click', action )

 
    modalElement.addEventListener( 'submit', e => e.preventDefault() )*/
 
