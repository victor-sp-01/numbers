class ModalElement {
    constructor( data ){
        this.element = document.createElement('div')
        this.body = data.body
    }
    
    create({ element = false, classID = false }){
        this.element.setAttribute( 'class', 'div__eWUQun3 scrollbarY' )
        this.element.innerHTML = (`
            <a class="a__uDXr80F" ></a>
        `)

        this.element.insertAdjacentHTML( 'beforeend', this.body )
        this.element.querySelector( '.a__uDXr80F' ).addEventListener( 'click', ()=> this.delete() )

        const Element = element || document.querySelector( classID ) || false

        if( Element )
            Element.append( this.element )
    }

    delete(){
        if( document.body.contains( this.element  ) )
            this.element.parentElement.removeChild( this.element )
    }

    findChildren( classID ){
        return this.element.querySelector( classID )
    } 
}

export default ModalElement