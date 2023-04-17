import { createLocalStorage } from "../api/apiLocalStorage.js"

const Setting =()=>{
    
    localStorage.setItem( 'Time', Date.now() ) 

    createLocalStorage( 'Setting', JSON.stringify({
        color   : '#5478a4',
        colors  : ['#f5f8de', '#c2a878', '#70798c', '#96adc8', '#ff6b6c', '#85baa1', '#88d9e6'],
        photo   : '1',
        photos  : [ ...Array( 23 ).keys() ].map( i => (`${ ++i }`) ),
        noteOrder : 'month'
    })) 

    createLocalStorage( 'DataNumber', JSON.stringify({
        typeGame : 'NUMBER',
        typeGenerate : 'NUMBER',
        limitRange : 1000,
        limitRangeGenerate : 1000,
        limitCasillas : 10 
    })) 
 
}

export default Setting