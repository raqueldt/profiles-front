// impactar el state



export const setSelectedCof = ( state, id ) => {

    state.selectedCof = id

}


export const setChangeHeaderConfirmation = ( state, id ) => {

    state.selectedChangeHeaderConfirmation = id

}

export const setSelectedConfirmacionFechaInicio = ( state, fecha ) => {
    state.selectedConfirmacionFechaInicio = fecha
}

export const setTotalConfirmacion = ( state, total ) => {

    state.totalConfirmacion = total

}

// 2022-09-06 | fg | asignar estructura de totales de la confirmacion
export const setConfirmationTotals = ( state, totals ) => {
   state.confirmationTotals = totals
}



