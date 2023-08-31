// impactar el state

export const setCreditNotes = ( state, creditNotes ) => {
   
   state.creditNotes = [...creditNotes]
   state.isLoading = false

}

export const addCreditNote = ( state, creditNote) => {

	state.creditNotes.push(creditNote)
	
}


export const updateCreditNote = ( state, creditNote ) => {

	const indice = state.creditNotes.map( item => item.devId ).indexOf( creditNote.devId )

	state.creditNotes.splice(indice, 1, creditNote)

}

export const deleteCreditNote = ( state, id ) => {
	state.creditNotes = state.creditNotes.filter( dev => dev.devId !== id )
}

