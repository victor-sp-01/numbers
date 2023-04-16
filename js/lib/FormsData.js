const FormsData =( datas = {} )=>{
    const Form = document.createElement( 'form' )

    for ( const data in datas ){

        const Textarea = document.createElement( 'textarea' ) 
        Textarea.setAttribute( 'name', data )
        Textarea.textContent = datas[ data ].trim()

        Form.append( Textarea )
    } 
         
    return Form
}

export default FormsData