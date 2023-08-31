// peticiones asincronas servidor base datos
import CreditNotesServices from "@/services/gps/cobranzas/CreditNotesServices"

export const loadCreditNotes = async ( { commit } , params )  => {

    const { data }  = await CreditNotesServices.getCreditNotes({ params })
    commit('setCreditNotes', data)

    //console.log("ACTION CREDIT NOTE LOAD", params, data)

}

export const createCreditNote = async ( { commit }, creditNote ) => {

	const { data } = await CreditNotesServices.storeCreditNote({ ...creditNote })

	commit('addCreditNote', { ...data })

}


export const updateCreditNote = async ( { commit }, creditNote ) => {

    const id = creditNote.devId

    const { data } = await CreditNotesServices.updateCreditNote({ ...creditNote }, id)   

    commit('updateCreditNote', { ...data })

}

export const deleteCreditNote = async ({ commit }, id ) => {
  
    await CreditNotesServices.deleteCreditNote( id )

    commit('deleteCreditNote', id)


}

