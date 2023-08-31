
// data del reporte
export const getData = ( state ) => ( filters ) => {

    // 
    const { cruise, country, agency }  = filters
    
    let filteredData = [...state.data]
    // aplicar filtro de crucero
    if ( cruise && cruise > 0)
       filteredData = filteredData.filter( item => item.cruId == cruise )
    if ( country && country > 0 )   
       filteredData = filteredData.filter( item => item.paiId == country )
    if ( agency && agency > 0 )   
       filteredData = filteredData.filter( item => item.cofClienteId == agency )

    return filteredData    

}


// unique cruises in report
export const getCruises = ( state ) => {

    return state.cruises

}

// unique countries filter report
export const getCountries = ( state ) => {

    return state.countries

}


// unique agencies filter report
export const getAgencies = ( state ) => {

    return state.agencies

}







