import ModalElement from "../lib/ModalElement.js";

const ListGenertateNumber =( numbers = [] )=>{
    const $Element = new ModalElement({
        body : (`
            <div class="div__nFEgf overflowY" >
                ${
                    numbers.map( (number, index) => {
                        return(`
                            <span class="span__L76xG${ index !== 0 ? ' line' : '' }" >${ number }</span>
                        `)
                    } ).join('')
                }
            </div>
        `)
    })

    $Element.create( { classID : '#root' } )
}

export default ListGenertateNumber