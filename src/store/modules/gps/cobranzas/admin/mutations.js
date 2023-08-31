


export const setCollectionFiles = ( state, data ) => {

  state.collectionFiles = data

}


export const setSelectedMonth = ( state, month ) => {

  if ( state.selectedMonth == month ) state.selectedMonth = null
  else state.selectedMonth = month

}

export const setSelectedClient = ( state, client ) => {

  if ( state.selectedClient == client ) state.selectedClient = null
  else state.selectedClient = client

}

export const setLoadingState = ( state, loadingState ) => {

  state.isLoading = loadingState

}


