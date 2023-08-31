
// disponibilidad general según parametros de busqueda
export const fetchAvailability = ( state ) => {

  return state.availability

}


// disponibilidad con filtros aplicados
export const fetchFilteredAvailability = ( state ) => {

  return state.filteredAvailability

}

// lista de cruceros propios
export const fetchCruises = ( state ) => {

  return state.cruises

}


// estado de carga
export const fetchLoadingState = ( state ) => {

  return state.isLoadingState

}

// estado de inicio
export const fetchInitialState = ( state ) => {

  return state.isInitialState

}

// filtro en proceso
export const fetchFilteringState = ( state ) => {

  return state.isFilteringState

}


// opciones para filtro por noches según data
export const fetchFilterNights = ( state ) => {

  return state.filters.nights

}

// opciones para filtro por tipo de itinerario según data
export const fetchFilterItineraryTypes = ( state ) => {

  return state.filters.itineraryTypes

}


// fecha de ultimo proceso de consulta de disponibilidad
export const fetchAvailabilityUpdatedAt = ( state ) => {

  return state.availabilityUpdatedAt

}

// retornar filtros seleccionados y aplicados por el usuario

export const fetchFilterCriteria = ( state ) => {

  const appliedFilters = state.filterCriteria.reduce((obj, item) => ({...obj, [item.field]: item.values }), {})

  return appliedFilters

}


export const fetchSummaryFilterCriteria = ( state ) => {

  return state.filterCriteria.filter( category => category.values.length )

}
