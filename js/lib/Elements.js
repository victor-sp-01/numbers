const CreateHTML =( { elements = false, html = '' } )=>{

    const Element = document.createElement( 'div' )
    Element.innerHTML = html.trim()

    if( elements ){
        for( const element in elements ){
            
            const _element = Element.querySelector( element )

            if( _element ){
                const dataElement = elements[ element ]

                for( const attributes in dataElement )
                    _element[ attributes ] = dataElement[ attributes ]

            }
        }
    } 

    return Element.innerHTML
}

export { CreateHTML }