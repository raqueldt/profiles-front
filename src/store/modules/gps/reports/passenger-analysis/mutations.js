export const setData = ( state, data ) => {

    state.data = [...data.passengers]
    state.cruises = [...data.cruises]
    state.agencies = [...data.agencies]
    state.countries = [...data.countries]

}


export const setSummaryViewActive = ( state, active) => {

    state.summaryViewActive = active

}
