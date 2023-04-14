class ModalApp {
    constructor( data ){
        this.header = data.header
        this.body   = data.body || ''
        
        this.element = document.createElement( 'div' ) 
    }

    create({ element = false, classID = false }){
        this.element.setAttribute( 'class', 'div__hL64LT7' )

        this.element.innerHTML = (`
            <header class="header__HbsCqHk" >
                <a href="#" class="a__uyuy5jd displayCenter" ><i class="fa-solid fa-arrow-left"></i></a>
            </header>
            <div class="div__ZFWmb6L overflowY" ></div>
        `)

        this.element.querySelector( '.header__HbsCqHk' ).insertAdjacentHTML( 'beforeend', this.header || '' )
        this.element.querySelector( '.div__ZFWmb6L' ).innerHTML = this.body


        const Element = element || document.querySelector( classID ) || false

        if( Element )
            Element.append( this.element )
    }

    findChildren( classID ){
        return this.element.querySelector( classID )
    }
}

export default ModalApp