const createLocalStorage =( key = false, data = false )=>{

    const getData = localStorage.getItem( key )
    if( getData ) return getData
    
    localStorage.setItem( key, data ) 
    return data
}

const getLocalStorage =( key = false, data = false )=>{
    const getData = localStorage.getItem( key )
    return getData ? getData : data
}
 

export { createLocalStorage, getLocalStorage }