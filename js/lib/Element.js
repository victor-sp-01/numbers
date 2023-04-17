class Element {
    constructor( option ){
        this.element    = option.element
        this.attributes = option.attributes || {}
        this.contents   = option.contents || {}

        this.children   = option.children || {}
    }

    create( { element = false, classID = false, begin = false } = {} ){
        const parentElement = element || document.querySelector( classID )
        const Element = document.createElement('div')

        Element.innerHTML = this.element

        if( Element.children.length !== 0 ) this.element = Element.children[0]
        else this.element = document.createElement('div')
        
        //atributos de elemento
        for( const attribute in this.attributes )
            this.element.setAttribute( attribute, this.attributes[ attribute ].trim() )

        for( const content in this.contents )
            this.element[ content ] = this.contents[ content ].trim()

        //atributos de los children del elemento
        for( const attributeChildren in this.children ){
            const element = this.element.querySelector( attributeChildren ) 

            if( element ){
                const attributes = this.children[ attributeChildren ].attributes
                const contents  = this.children[ attributeChildren ].contents
    
                for( const attribute in attributes )
                    element.setAttribute( attribute, attributes[ attribute ].trim() )
    
                for( const content in contents )
                    element[ content ] = contents[ content ].trim()
            }
            
        }

        Element.innerHTML = ''
        
        //render si existe en el DOM
        if( parentElement ){
            if( begin ) parentElement.prepend( this.element )
            else parentElement.append( this.element )

        }
    }  
    
    delete(){
        if( document.body.contains( this.element  ) )
            this.element.parentElement.removeChild( this.element )
    }

    clean(){
        this.element.textContent = ''
    }

    html( html ){  
        this.element.innerHTML = html
    }

    findChildren( classID ){   
        return this.element.querySelector( classID )
    }

    findChildrens( classID ){   
        return this.element.querySelectorAll( classID )
    }
}

export default Element
 