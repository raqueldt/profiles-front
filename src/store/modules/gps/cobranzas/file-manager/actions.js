// peticiones asincronas servidor base datos
import FileManagerServices from "@/services/gps/cobranzas/FileManagerServices"
import ProfilesServices from "@/services/gps/profiles/ProfilesServices"

export const loadFileSummary = async ( { commit } , id )  => {

   
    const { data }  = await FileManagerServices.getFileSummary(id)

    commit('setFileSummary', data)

    //console.log("ACTION LOAD SUMMARY ", id, "RESPONSE ",data)

}

export const loadFileManager = async ( { commit } , params )  => {
    
    const { data }  = await FileManagerServices.getFileManager({ params })

    commit('setFileManager', data)

}

export const loadClientes = async ( { commit } )  => {

    const { data }  = await ProfilesServices.getClientes()

    commit('setClientes', data)

}