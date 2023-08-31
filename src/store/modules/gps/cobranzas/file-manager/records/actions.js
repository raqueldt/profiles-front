// peticiones asincronas servidor base datos
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"

export const loadCobranzas = async ( { commit } , confirmacion )  => {

    const { data } = await CobranzasServices.getCobranzas({ params: {confirmacion}})

    commit('setCobranzas', data)

}


export const updateCobranza = async ( { commit }, cobranza ) => {

    const id = cobranza.ccoId

    const { data } = await CobranzasServices.updateCobranza({ ...cobranza }, id)   

    commit('updateCobranza', { ...data })

}


export const createCobranza = async ( { commit }, cobranza ) => {

	
	const { data } = await CobranzasServices.createCobranza({ ...cobranza })

	commit('createCobranza', { ...data })

}


export const deleteCobranza = async ({ commit }, cobranza ) => {
  
    const id = cobranza.id

    await CobranzasServices.deleteCobranza( cobranza, id )

}

export const getDevoluciones = async ( { commit }, notacredito ) => {

    const confirmacion = notacredito.id;
 const tipo = notacredito.tipo;
    const { data } = await CobranzasServices.getDevoluciones({params:{tipo:tipo}}, confirmacion)   
    commit('setDev', data)
}



