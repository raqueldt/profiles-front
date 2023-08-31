// leer el state

export const getCobranzas = ( state ) => {

	return state.cobranzas

}


export const getCobranza = ( state ) => ( id = '' ) => {

	const cobranza = state.cobranzas.find( cobr => cobr.ccoId == id )

	return {...cobranza} 

}
export const getDev = ( state ) => {

	return state.notacredito

}
