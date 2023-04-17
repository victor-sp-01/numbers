import UpdatePage from "../routes/UpdatePage.js";
import ModalOption from "../lib/ModalOption.js";
import { createLocalStorage } from "../api/apiLocalStorage.js";
import getDataNumber from "../data/getDataNumber.js";

const OpcOpciones =()=>{

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
            text    : 'fondo',
            action  : 'btnFondo',
            icon    : '<i class="fa-solid fa-image"></i>',
            active  : true
        } 
    ]
 
    const Options = { 
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
                                        <div class="div__RGeJw overflowX" >
                                            <div class="div__Rbcmp" >
                                            <label class="label__15VqS" for="newColor" >
                                                <input type="color" id="newColor" value="${ Setting.color }" >
                                                <span><i class="fa-solid fa-plus"></i></span>
                                            </label>
                                            ${

                                                Setting.colors.map( color => {
                                                    return(`
                                                        <button class="button__VIbr8 after btn-o2p9TSW4iZRC8Ba" style="background: ${ color }" data-color="${ color }" ></button>
                                                    `)
                                                }).join('')  

                                            }
                                            </div>
                                        </div>
                                        <div class="div__jQ3rW" >
                                            <button type="button" class="button__4uumK after btn-o2p9TSW4iZRC8Ba" data-color="#5478a4" >
                                                <i class="fa-solid fa-repeat"></i>
                                            </button>
                                            <button type="submit" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="changeColor" >
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    `)
                                }

                                else if( action === 'btnChangePhoto' ){ 
                                    return(`
                                        <div class="div__RGeJw overflowX" >
                                            <input type="text" name="namePhoto" hidden>
                                            <div class="div__Rbcmp" > 
                                                ${

                                                    Setting.photos.map( photo => {
                                                        return(`
                                                            <button class="button__RBwBv after btn-g3Rq8iicH3bMqiG ${ photo === Setting.photo ? 'focus' : '' }" data-photo="${ photo }" >
                                                                <img src="./img/backgrounds/${ photo }.jpg" >
                                                            </button>
                                                        `)
                                                    }).join('')  

                                                }
                                            </div>
                                        </div>
                                        <div class="div__jQ3rW" >
                                            <button type="button" class="button__4uumK after btn-UTUmbzVPSJwyPPO" >
                                                <i class="fa-solid fa-repeat"></i>
                                            </button>
                                            <button type="submit" class="button__4uumK after btn-iWCJMIoNWAcOezkYe7dd" data-action="changePotho" >
                                                <i class="fa-solid fa-arrow-right"></i>
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
                            const button = $Element.findChildren( '.button__4uumK.after.btn-iWCJMIoNWAcOezkYe7dd' )
                            button.style.color = e.target.value
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
                        const color = target.dataset.color

                        if( target.classList.contains( 'btn-o2p9TSW4iZRC8Ba' ) ){

                            const button = $Element.findChildren( '.button__4uumK.after.btn-iWCJMIoNWAcOezkYe7dd' )
                            const input = $Element.findChildren( '#newColor' )
                            input.value = color  
                            button.style.color   = input.value

                            return
                        }

                        if( target.classList.contains( 'btn-g3Rq8iicH3bMqiG' ) ){
                            if( !target.classList.contains( 'focus' ) ){
                                const btnFocus = $Element.findChildren( '.button__RBwBv.after.btn-g3Rq8iicH3bMqiG.focus' )
                                if( btnFocus ) btnFocus.classList.remove( 'focus' )
                                target.classList.add( 'focus' )
                                target.form.namePhoto.value = target.dataset.photo
                            } else {
                                const btnFocus = $Element.findChildren( '.button__RBwBv.after.btn-g3Rq8iicH3bMqiG.focus' )
                                if( btnFocus ) btnFocus.classList.remove( 'focus' )
                                target.form.namePhoto.value = ''
                            }
                        }

                        if( target.classList.contains( 'btn-UTUmbzVPSJwyPPO' ) ){
                            const btnFocus = $Element.findChildren( '.button__RBwBv.after.btn-g3Rq8iicH3bMqiG.focus' )
                            if( btnFocus ) btnFocus.classList.remove( 'focus' )
                            target.form.namePhoto.value = ''
                        }

                    },
                    submit : e => {
                        e.preventDefault()

                        const action = e.submitter.dataset.action

                        if(  action === 'changeColor' ){
                            Setting.color = e.target.newColor.value
                            if( !Setting.colors.includes( Setting.color ) ){
                                Setting.colors.unshift( Setting.color )
                                Setting.colors.pop()
                            }

                            localStorage.setItem( 'Setting', JSON.stringify( Setting ) )
                            $Element.delete()
                            UpdatePage()
                        } else if ( action === 'changePotho' ){
                            Setting.photo = e.target.namePhoto.value
                            localStorage.setItem( 'Setting', JSON.stringify( Setting ) )
                            $Element.delete()
                            UpdatePage()
                        }
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

export default OpcOpciones
 

 