

export const setAvailability = ( state, availability ) => {

  state.availability = [...availability]
  state.availabilityUpdatedAt = new Date().toLocaleString()
  //restablecer filtros
  state.filteredAvailability = [...availability]

}


export const setCruises = ( state, cruises ) => {

  state.cruises = [...cruises]

}


export const setLoadingState = ( state, loading ) => {

  state.isLoadingState = loading

}


export const setInitialState = ( state, initial ) => {

  state.isInitialState = initial

}


export const setFilteringState = ( state, filtering ) => {

  state.isFilteringState = filtering

}


// establecer opciones disponibles de filtro según data de disponibilidad

export const setFilters = ( state, data ) => {

  // reset already applied filters
  state.filterCriteria = []

  // reset options filters
  Object.keys( state.filters ).forEach( key => state.filters[key] = [] )



  // set option filters -- nights
  const nights = [ ...new Set( data.map( departure => departure.itiNights ) ) ].sort((a, b) => a - b)

  state.filters.nights = nights



  // set option filters -- itinerary types
  const types = data.map( departure => ({ type: departure.itiType, name: departure.itineraryType }))

  // Crear un array de objetos con unique "type"
  let itineraryTypes = [
    ...new Map( types.map( item => [item["type"], item]) ).values(),
  ];

  state.filters.itineraryTypes = itineraryTypes


}


// establecer filtros seleccionados
export const setFilterCriteria = ( state, { filterCriteria } ) => {

  state.filterCriteria = [ ...filterCriteria ]


}


// aplicar filtros a la disponibilidad
export const setFilteredAvailability = ( state, data ) => {

  state.filteredAvailability =  data

}


// reset state availability search
export const resetAvailability = ( state ) => {

  state.availability = []
  state.availabilityUpdatedAt = null
  state.filteredAvailability = []
  state.filterCriteria = []
  state.isInitialState = true

}



