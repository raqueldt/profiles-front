
// data del reporte
export const getData = ( state ) => ( country ) => {
    
    if ( country.length > 0)
       return state.data.filter( item => item.pais == country)
    return state.data

}

// detalles del reporte
export const getDetails = ( state )  => {
    
    return state.details

}

// extraer clientes desde data
export const getCountries = ( state ) => {

    return state.countries

}




