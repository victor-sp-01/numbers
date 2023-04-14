import UpdatePage from "../routes/UpdatePage.js";

import ModalOption from "../lib/ModalOption.js";
import { createLocalStorage } from "../api/apiLocalStorage.js";

const OpcGenerate =()=>{

    const DataNumber = JSON.parse(createLocalStorage( 'DataNumber', JSON.stringify({
        limitRange : 1000,
        limitRangeGenerate : 1000,
        limitCasillas : 10 
    }))) 
    
    const Setting = JSON.parse(createLocalStorage( 'Setting', JSON.stringify({
        color : '#6A8D93',
        noteOrder : 'month'
    }))) 


    const Option = [
        {
            text    : 'numeros',
            action  : 'btnNumbers',
            icon    : '<i class="fa-solid fa-arrow-up-1-9"></i>'
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
                            const input = e.target.form.limitRangeGenerate

                            if( e.target.dataset.action === 'btnLess' )
                                return input.value = ((number)=>{
                                    --number
                                    number = number < 3 ? 10000 : number
                                    number = number || 1000
                                    

                                    return number
                                })( input.value  )

                            else if( e.target.dataset.action === 'btnAdd' )
                                return input.value = ((number)=>{
                                    ++number
                                    number = number > 10000 ? 1 : number
                                    number = number || 1000

                                    return number
                                })( input.value  )
                        } 

                    },
                    submit : e => {
                        e.preventDefault()

                        DataNumber.limitRangeGenerate = ((number)=>{
                            number = +number
                            number = number < 1 ? 10000 : number
                            number = number > 10000 ? 1 : number
                            number = number || 1000

                            return number
                        })(e.target.limitRangeGenerate.value) 

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
                        <input type="number" class="input__bHvkr" name="limitRangeGenerate" value="${ DataNumber.limitRangeGenerate || 1000 }" placeholder="limite de rango" >
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

export default OpcGenerate
 