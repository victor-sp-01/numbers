class ModalOption {

    constructor( options ){
        this.option = options.option
        this.options = options.options

        this.elementContainer = document.createElement( 'div' )

        this.events = []
    }

    create({ element = false, classID = false }){
        this.elementContainer.setAttribute( 'class', 'div__bx61Xqf' )

        this.elementContainer.innerHTML = (`
            <a class="a__GhoSVJO" ></a>
            <div class="form__6XLe66y " >
                <div class="div__FqNPnEf" >
                    <div class="div__wFdhlSU" >

                        ${
                            this.option.map( option => {

                                if( !option.active ) return ''

                                const element = document.createElement( 'button' )
                                element.setAttribute( 'class', 'button__3yg4wyD button-PZovctOa1d3bZHE' )
                                element.setAttribute( 'data-option', option.action )

                                element.innerHTML = (`
                                    ${ option.icon || '' }
                                    <span></span>
                                `)

                                element.querySelector( 'span' ).textContent = option.text || ''

                                return element.outerHTML
                                
                            }).join('')
                        }

                    </div>
                    <div class="div__36kh8rO" >
                        <button class="button__alcXn7U" ><i class="fa-solid fa-arrow-left"></i></button>
                        <div class="div__yXygiCR overflowY" ></div>
                    </div>
                </div> 
            </div>
        `)



        this.elementContainer.querySelector( '.div__wFdhlSU' ).addEventListener( 'click', e => {
            if( e.target.classList.contains( 'button-PZovctOa1d3bZHE' ) ){ 

                this.changeOption( this.options[ e.target.dataset.option ] ) 
            }
        })

        this.elementContainer.querySelector( '.button__alcXn7U').addEventListener( 'click', ()=>{
            this.elementContainer.querySelector( '.div__FqNPnEf').classList = 'div__FqNPnEf'
            this.elementContainer.querySelector( '.div__yXygiCR' ).textContent = ''  

            if( this.events.length !== 0 ){
                this.deleteEvents() 
            }

        })

        this.elementContainer.querySelector( '.a__GhoSVJO').addEventListener( 'click', ()=>{ 
            this.delete()
        })
        
        const Element = element || document.querySelector( classID ) || false

        if( Element )
            Element.append( this.elementContainer )
    }

    delete(){
        if( document.body.contains( this.elementContainer  ) ){
            this.elementContainer.parentElement.removeChild( this.elementContainer )
            this.deleteEvents()
        }
    }

    changeOption( { events = false, html = '' } = {} ){

        const ElementParent = this.elementContainer.querySelector( '.div__FqNPnEf')
        const Element = ElementParent.querySelector( '.div__yXygiCR' )
        ElementParent.classList.add( 'options' )
        Element.innerHTML = html 


        for( const event in events ){
            const element = Element.querySelector( event )

            for( const typeEvent in events[ event ] ){

                this.createEvents({
                    element     : element,
                    typeEvent   : typeEvent,
                    event       : events[ event ][ typeEvent ]
                })

            }
        }
        
    }

    createEvents( { element = false, typeEvent = false, event = false } = {} ){

        if( !element ) return
        if( !typeEvent ) return
        if( !event ) return

        element.addEventListener( typeEvent, event )
        this.events.push({ element, typeEvent, event }) 
           
    }

    deleteEvents(){

        this.events.forEach(( { element = false, typeEvent = false, event = false } = {} )=>{

            if( !element ) return
            if( !typeEvent ) return
            if( !event ) return

            element.removeEventListener( typeEvent, event )
        })

        this.events = [] 

    }

}

export default ModalOption
 