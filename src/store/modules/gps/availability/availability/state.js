

export default () => ({

  isLoadingState: false,
  isInitialState: true, // control para no mostrar state 'no results found'
  isFilteringState: false,

  availability: [],

  availabilityUpdatedAt: null,  // fecha de último proceso de busqueda

  filteredAvailability: [],

  cruises: [],

  pagination: {

    current_page: null,
    first_page_url: null,
    from: null,
    last_page: null,
    last_page_url: null,
    next_page_url: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null

  },

  // opciones de filtro segun data de disponibilidad
  filters: {
    nights: [],
    itineraryTypes: [],
    priceRange: [],
    sites: [],
    species: []
  },

  // criterios de filtro aplicados por el usuario
  filterCriteria: []

})
