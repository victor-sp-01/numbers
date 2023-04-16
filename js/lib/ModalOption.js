class ModalOption {
    constructor( options ){
        this.option     = options.option
        this.options    = options.options

        this.element            = ''
        this.elementBackground  = ''
        this.elementContainerOption = ''
        this.elementContentOption = ''

        this.elementOption      = ''
        this.elementOptions         = ''
        this.elementOptionsButton   = ''
        this.elementOptionsContent  = ''

        this.events     = []
    }

    create({ element = false, classID = false }){
        //ELEMENTOS
        this.element = document.createElement( 'div' )
        this.element.setAttribute( 'class', 'div__bx61Xqf' )
        this.element.innerHTML = (`
            <a class="a__GhoSVJO" ></a>
            <div class="div__6XLe66y" >
                <div class="div__FqNPnEf" >
                    <div class="div__wFdhlSU" ></div>
                    <div class="div__36kh8rO" >
                        <button class="button__alcXn7U" ><i class="fa-solid fa-arrow-left"></i></button>
                        <div class="div__yXygiCR overflowY" ></div>
                    </div>
                </div> 
            </div>
        `)

        this.elementBackground      = this.element.querySelector( '.a__GhoSVJO' )
        this.elementContainerOption = this.element.querySelector( '.div__6XLe66y' )
        this.elementContentOption   = this.element.querySelector( '.div__FqNPnEf' )

        this.elementOption  = this.element.querySelector( '.div__wFdhlSU' )
        this.elementOptions = this.element.querySelector( '.div__36kh8rO' )

        this.elementOptionsButton = this.element.querySelector( '.button__alcXn7U' )
        this.elementOptionsContent = this.element.querySelector( '.div__yXygiCR.overflowY' )

        this.elementOptions.parentElement.removeChild( this.elementOptions )

        //EVENTOS
        this.elementBackground.addEventListener( 'click', ()=>{ 
            this.delete()
        })

        this.elementOption.addEventListener( 'click', e => {
            if( e.target.classList.contains( 'button-PZovctOa1d3bZHE' ) ){ 
                this.changeOption( this.options[ e.target.dataset.option ] ) 
            }
        })

        this.elementOptionsButton.addEventListener( 'click', ()=>{
            this.changeElement( true )   
            if( this.events.length !== 0 ) this.deleteEvents()
        })

        //RENDER
        this.elementOption.innerHTML = this.option.map( option => {

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

        const Element = element || document.querySelector( classID ) || false
        if( Element ) Element.append( this.element )

    }
 
    delete(){
        if( document.body.contains( this.element  ) ){
            this.element.parentElement.removeChild( this.element )
            this.deleteEvents()
        }
    }

    changeElement( main = true ){
        this.elementContainerOption.innerHTML = ''
        this.elementContentOption.innerHTML = ''

        if( main ){
            this.elementContentOption.append( this.elementOption )
            this.elementContainerOption.append( this.elementContentOption )
            return
        }

        this.elementOptions.append( this.elementOptionsButton, this.elementOptionsContent )
        this.elementContentOption.append( this.elementOptions)
        this.elementContainerOption.append( this.elementContentOption ) 
    }

    changeOption( { events = false, html = '' } = {} ){

        this.elementOptionsContent.innerHTML = html
        this.changeElement( false )
          
        for( const event in events ){
            const element = this.elementOptionsContent.querySelector( event )

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


    findChildren( classID ){   
        return this.elementOptionsContent.querySelector( classID )
    }

    findChildrens( classID ){   
        return this.elementOptionsContent.querySelectorAll( classID )
    }

}

export default ModalOption