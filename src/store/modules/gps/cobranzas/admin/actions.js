
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices";



export const loadCollectionFiles = async ( { commit } , params )  => {

  const { data }  = await CobranzasServices.getCollectionFiles( params )

  commit('setCollectionFiles', data)

}

