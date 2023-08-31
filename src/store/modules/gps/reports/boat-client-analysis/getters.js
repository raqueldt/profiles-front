
// data del reporte
export const getData = ( state ) => ( country ) => {
    
    if ( country.length > 0)
       return state.data.filter( item => item.pais == country)
    return state.data

}

// extraer clientes desde data
export const getCountries = ( state ) => {

    return state.countries


    
}

// extraer cruises desde data
export const getCruises = ( state ) => {

    return state.cruises

}

export const getDataDetail = ( state ) => {

	return state.data

}



