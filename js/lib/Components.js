class Components {
    constructor( option ){
        this.element = option.element || document.querySelector( option.classID ) || false
        this.data    = option.data ||  {}
        this.template= option.template
    }

    render(){
        if( this.element ){
            this.element.innerHTML = this.template( this.data )
        }
    }
 
}

export default Components