import UpdatePage from "../routes/UpdatePage.js";
import ModalOption from "../lib/ModalOption.js";
import { createLocalStorage } from "../api/apiLocalStorage.js";
import getDataNumber from "../data/getDataNumber.js";

const OpcNumber =()=>{

    const DataNumber = JSON.parse(createLocalStorage( 'DataNumber', JSON.stringify({
        typeGame : 'NUMBER',
        typeGenerate : 'NUMBER',
        limitRange : 1000,
        limitRangeGenerate : 1000,
        limitCasillas : 10 
    })) ) 
    
    const Setting = JSON.parse(createLocalStorage( 'Setting', JSON.stringify({
        color : '#5478a4',
        noteOrder : 'month'
    })))    


    const Option = [
        {
            text    : 'categoria',
            action  : 'btnCategoria',
            icon    : '<i class="fa-solid fa-lines-leaning"></i>',
            active  : true
        },
        {
            text    : 'numeros',
            action  : 'btnNumbers',
            icon    : '<i class="fa-solid fa-arrow-up-1-9"></i>',
            active  : DataNumber.typeGame === 'NUMBER'
        },
        {
            text    : 'casillas',
            action  : 'btnCasillas',
            icon    : '<i class="fa-solid fa-list"></i>',
            active  : true
        },
        {
            text    : 'fondo',
            action  : 'btnFondo',
            icon    : '<i class="fa-solid fa-image"></i>',
            active  : true
        } 
    ]
 
    const Options = {
        btnCategoria : {
            events : {
                '.div__DQRvV' : {
                    click : e => {
                        if( e.target.classList.contains( 'btn-k5H0sDnuJmJsUHr' ) ){

                            const change = e.target.dataset.change

                            if( change !== '' ){ 

                                if( change === 'NUMBER' ){
                                    DataNumber.limitRange       = 1000
                                    DataNumber.limitCasillas    = 10
                                } else {
                                    DataNumber.limitRange       = getDataNumber( change ).length - 1
                                    DataNumber.limitCasillas    = Math.round(DataNumber.limitRange / 2) + 1 
                                    DataNumber.limitCasillas    = DataNumber.limitCasillas > 10 ? 10 : DataNumber.limitCasillas
                                }

                                DataNumber.typeGame = change
                                localStorage.setItem( 'DataNumber', JSON.stringify( DataNumber ) )
                                $Element.delete()
                                UpdatePage()
                            }
                        }
                    }
                }
            },
            html :  (`
                <div class="div__DQRvV" >

                    ${ 

                        [
                            { action : 'NUMBER', text : 'numeros' },
                            { action : 'ABC', text : 'abecedario' },
                            { action : 'MONTH', text : 'meses' },
                            { action : 'DAY', text : 'dias' },
                            { action : 'BIBLE', text : 'libros biblicos' }
                        ].map( data =>{

                            const focus = DataNumber.typeGame === data.action

                            return (`
                                <button class="button__u7eyj after ${ focus ? 'focus' : '' } btn-k5H0sDnuJmJsUHr" data-change="${ data.action }"  >
                                    <span>${ data.text }</span>
                                    ${ focus ? '<i class="fa-solid fa-circle-check"></i>' : '' }
                                </button>
                            `)
                        }).join('')

                    } 

                </div>
            `)
        },

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

        btnFondo : { 
            events:{
                '.div__f9fcM' : {
                    click : e => {

                        const target = e.target
                        const targetParent = e.target.parentElement 
                        const action = target.dataset.action

                        if( target.classList.contains( 'btn-4K8Ftg4pR5QBubw' )){
                            targetParent.classList.toggle( 'actForm' )
                            target.classList.toggle( 'active' )

                            $Element.findChildren( '.form__SgFnz' ).innerHTML = ((estado)=>{

                                if( !estado ) return ('')
 
                                if( action === 'btnChangeColor' ){
                                    return(`
                                        <div class="div__RGeJw" >
                                            <label class="label__15VqS" style="background : ${ Setting.color }" for="newColor" >
                                                <input type="color" id="newColor" value="${ Setting.color }" >
                                                <span>${ Setting.color }</span>
                                            </label>
                                        </div>
                                        <div class="div__jQ3rW" >
                                            <button type="button" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="defaultColor" >
                                                <i class="fa-solid fa-repeat"></i>
                                            </button>
                                            <button type="submit" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="changeColor" >
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    `)
                                }

                                else if( action === 'btnChangePhoto' ){
                                    //
                                    return(`
                                        <div class="div__94smt" >
                                            <label class="label__dUUOj" for="newPhoto" style="display:none" >
                                                <input type="file" id="newPhoto" >
                                                <img src="./img/icons/plus.png">
                                            </label>
                                            <button type="submit" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="changePotho" style="display:none" >
                                                <span>proximanente</span>
                                            </button>
                                        </div> 
                                    `)
                                }
    
                                return ('')
                            })( target.classList.contains( 'active' ) )
                        } 
                    }
                },
                '.form__SgFnz' : {
                    change : e =>{
                        const target = e.target
                        const form = e.target.form
                        
                        if( target === form.newColor ){
                            e.target.parentElement.style.background = e.target.value
                        }

                        else if( target === form.newPhoto ){
                            const file = target.files[0]
                            if( file ){
                                const reader = new FileReader()
                                reader.readAsDataURL( file )

                                reader.addEventListener( 'load', e => {
                                    const url = URL.createObjectURL( file )
                                    const img =  $Element.findChildren( '.label__dUUOj img' )
                                    img.setAttribute( 'src', url )
                                    img.setAttribute( 'class', 'photo' )
                                })
                            }
                        }

                    },
                    click : e =>{
                        const target = e.target
                        const action = target.dataset.action

                        if( target.classList.contains( 'btn-iWCJMIoNWAcOezkYe7dd' )){
                            if( action === 'defaultColor' ){
                                console.log( '' )
                                const input = $Element.findChildren( '#newColor' )
                                input.value = '#5478a4'     
                                input.parentElement.style.background = input.value
                                return
                            }
                        }
                    },
                    submit : e => {
                        e.preventDefault()

                        const action = e.submitter.dataset.action

                        if(  action === 'changeColor' ){
                            Setting.color = e.target.newColor.value
                            localStorage.setItem( 'Setting', JSON.stringify( Setting ) )

                            $Element.delete()
                            UpdatePage()
                        } else if ( action === 'changePotho' ){}
                    }
                }
            },
            html :  (`
                    <div class="div__IM87L" >
                        <div class="div__f9fcM" >
                            <button class="button__s4MYM after btn-4K8Ftg4pR5QBubw" data-action="btnChangeColor" >
                                <i class="fa-solid fa-palette"></i>
                                <span>color</span>
                            </button>
                            <button class="button__s4MYM after btn-4K8Ftg4pR5QBubw" data-action="btnChangePhoto" >
                                <i class="fa-regular fa-image"></i>
                                <span>foto</span>
                            </button>
                        </div>

                        <form class="form__SgFnz" autcomplete="off" ></form> 
                    </div> 
                `) 
        }
        
    }

   

    const $Element = new ModalOption({ option : Option, options : Options })
    $Element.create({ classID : '#root' })
   
}

export default OpcNumber
 

/*


*/