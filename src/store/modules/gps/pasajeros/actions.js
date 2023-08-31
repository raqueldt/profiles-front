// peticiones asincronas servidor base datos
import ListaPasajerosServices from "@/services/gps/lista-pasajeros/ListaPasajerosServices"

export const loadPassengers = async ( { commit } , confirmacion )  => {

    const { data } = await ListaPasajerosServices.getPasajerosCotizacion({ params: {confirmacion}})

    commit('setPassengers', data)

}


export const updatePassenger = async ( { commit }, passenger ) => {

    const id = passenger.lpaId

    const { data } = await ListaPasajerosServices.updatePasajero({ ...passenger }, id)   

    commit('updatePassenger', { ...data })

}


export const createPassenger = async ( { commit }, passenger ) => {

	
	const { data } = await ListaPasajerosServices.storePasajero({ ...passenger })

	commit('addPassenger', { ...data })

}


export const deletePassenger = async ({ commit }, passenger ) => {
  
    const id = passenger.id

    await ListaPasajerosServices.deletePasajero( passenger, id )

    commit('deletePassenger', id)



}


export const cancelPassenger = async ({ commit }, request) => {
    
    //try {
        //endpoint
        const { data } = await ListaPasajerosServices.cancelPassenger( request )
        //commit
        commit('cancelPassenger', {...data})

/*
    } catch (error) {

        console.log("ACTION ERROR", error.response.status, error.response.data )
        
    }
*/
    


}


