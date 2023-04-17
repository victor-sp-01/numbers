import UpdatePage from "../routes/UpdatePage.js";

import ModalOption from "../lib/ModalOption.js";
import { createLocalStorage } from "../api/apiLocalStorage.js";

const OpcGenerate =()=>{

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
            active  : DataNumber.typeGenerate === 'NUMBER'
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

                                DataNumber.typeGenerate = change
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

                            const focus = DataNumber.typeGenerate === data.action

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
        }  
    }

   

    const $Element = new ModalOption({ option : Option, options : Options })
    $Element.create({ classID : '#root' })

}

export default OpcGenerate
 