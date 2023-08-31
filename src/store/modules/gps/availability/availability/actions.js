


import CruiseServices from '@/services/gps/cruise/CruiseServices'
import AvailabilityServices from '@/services/gps/availability/availabilityServices'



// cargar lista de cruceros
export const loadCruises = async ( { commit } ) => {

  const { data: cruises } = await CruiseServices.getOwnCruises()  // solo cruceros propios

  commit('setCruises', cruises )


}



// cargar disponibilidad
export const loadAvailability = async ( { commit }, params ) => {

 const { data: { data: { data } }} = await AvailabilityServices.getAvailability( { params })

 commit('setAvailability', data )

 commit('setFilters', data)

}


// aplicar filtros a la disponibilidad
export const loadFilteredAvailability = ( { commit, state } ) => {

  const departures = state.availability

  const activeFilters = state.filterCriteria.filter( categoria => categoria.values.length )

  if ( activeFilters.length  ) {

    const matches = departures.filter( departure => {

      let counter = 0
      
      activeFilters.forEach( currentFilter => {
          
          currentFilter.values.indexOf( departure[currentFilter.field] ) > -1 ? counter ++ : counter += 0

          // condición adicional en caso de seleccionar ONLY PROMOTIONS
          if(currentFilter.field === 'prices.promotion') {
            Boolean(departure.prices.promotion) ?  counter ++ : counter += 0
          }

      })

      // incluir en la data filtrada solo los todos los criterios fueron cumplidos
      return counter == activeFilters.length

    })

    commit('setFilteredAvailability', matches)

  } else  {

    commit('setFilteredAvailability', departures )

  }


}


