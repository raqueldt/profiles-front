// impactar el state

export const setCobranzas = ( state, cobranzas ) => {

   state.cobranzas = [...cobranzas]
   state.isLoading = false

}

export const updateCobranza = ( state, cobranza ) => {

	 const indice = state.cobranzas.map( cobr => cobr.ccoId ).indexOf( cobranza.ccoId )

	 state.cobranzas.splice(indice, 1, cobranza)

}

export const createCobranza = ( state, cobranza) => {

	state.cobranzas.push(cobranza)
	
}


export const addCobranzas = ( state, cobranza) => {

	state.cobranzas.push(cobranza)
	
}
export const setDev = ( state, notacredito ) => {
  // console.log('actualizando estado');
	state.notacredito = [...notacredito]
/* 	console.log(state.notacredito); */
 }
 


