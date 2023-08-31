// leer el state

export const getPassengers = ( state ) => {

	return state.passengers

}


export const getPassenger = ( state ) => ( id = '' ) => {

	const passenger = state.passengers.find( pax => pax.lpaId == id )

	return {...passenger} // para evitar retornar por referencia y alterar el state directamente

}
