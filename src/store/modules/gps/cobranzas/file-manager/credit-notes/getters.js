// leer el state

export const getCreditNotes = ( state ) => {

	return state.creditNotes

}


export const getCreditNote = ( state ) => ( id = '' ) => {

	const creditNote = state.creditNotes.find( item => item.devId == id )

	return {...creditNote} // para evitar retornar por referencia y alterar el state directamente

}
