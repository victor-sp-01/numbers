class Element {
    constructor( data ){ 
        
        this.key        = Object.keys( data )[0] || false
        this.attributes = data[ this.key ].attributes || {}
        this.contents   = data[ this.key ].contents   || {}

        this.element    = null 
    }
 
    

    append( { element = false, classID = false } ){  

        const Element = element || document.querySelector( classID )  

        if( Element )
            Element.append( this.element )

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

    create( parent = false ){
        this.element = document.createElement( this.key )

        for( const atribute in this.attributes )
            this.element.setAttribute( atribute, this.attributes[ atribute ].trim() )

        for( const content in this.contents )
            this.element[ content ] = this.contents[ content ].trim() 

        if( parent ) this.append( parent )  
    }

    delete(){  
        this.element.parentElement.removeChild( this.element )
    }
    
}

export default Element


//create({parent : { element : '#root' }})