import moment from 'moment'

export const getCompleteCollectionFiles = ( state ) => {

  return state.collectionFiles

}



export const getCollectionFiles = ( state ) => {


  return state.collectionFiles.filter( file => {

    const monthFile = moment(file.start_date_file).month() + 1

    if ( state.selectedMonth )   return  monthFile == state.selectedMonth

    return true


  }).filter( file => {

    if ( state.selectedClient ) return file.id_client == state.selectedClient

    return true

  })


}


export const getSelectedMonth = ( state ) => {

  return state.selectedMonth

}


export const getSelectedClient = ( state ) => {

  return state.selectedClient

}


export const loadingActive = ( state ) => {

  return state.isLoading

}

export const isEmpty = ( state ) => {

  return state.collectionFiles.length == 0

}
