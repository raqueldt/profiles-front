// impactar el state

export const setPassengers = ( state, passengers ) => {

   state.passengers = [...passengers]
   state.isLoading = false

}

export const updatePassenger = ( state, passenger ) => {

	 const indice = state.passengers.map( pax => pax.lpaId ).indexOf( passenger.lpaId )

	 state.passengers.splice(indice, 1, passenger)

}



export const addPassenger = ( state, passenger) => {

	state.passengers.push(passenger)
	
}


export const deletePassenger = ( state, id ) => {


	state.passengers = state.passengers.filter( pax => pax.lpaId !== id )


}

export const cancelPassenger = ( state, passenger ) => {

	const indice = state.passengers.map( pax => pax.lpaId ).indexOf( passenger.lpaId )

	state.passengers.splice(indice, 1, passenger)

}
