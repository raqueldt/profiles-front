// leer el state

export const getSelectedCof = ( state ) => {

	return state.selectedCof

}
export const getChangeHeaderConfirmation = ( state ) => {

	return state.selectedChangeHeaderConfirmation

}
export const getSelectedConfirmacionFechaInicio = ( state ) => {

	return state.selectedConfirmacionFechaInicio

}
export const getTotalConfirmacion = ( state ) => {

	return state.totalConfirmacion

}

// 2022-09-06 | fg | retornar objeto totales
export const getConfirmationTotals = ( state ) => {
   return state.confirmationTotals
}
