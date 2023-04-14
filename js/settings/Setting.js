import { createLocalStorage } from "../api/apiLocalStorage.js"

const Setting =()=>{
    
    localStorage.setItem( 'Time', Date.now() ) 

    createLocalStorage( 'Setting', JSON.stringify({
        color : '#6A8D93',
        noteOrder : 'month'
    })) 

    createLocalStorage( 'DataNumber', JSON.stringify({
        limitRange : 1000,
        limitRangeGenerate : 1000,
        limitCasillas : 10 
    })) 
 
}

export default Setting