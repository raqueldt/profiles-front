import axios from 'axios'
import conf from '@/services/conf.js'


const resource = '/api/lista-pasajeros'
const servergps = conf.servergps;

export default {

    //2022-05-04 | fg | busca pasajeros por nombre/apellido
    search(params){

        
        const url = servergps + resource + '/search'
        return axios.get(url, { params })

    },

    //2022-02-09 | fg | datos de contro de cabina para proceso de cancelacion
    getControlCabina(id){
        const url = servergps + resource + '/' + id + '/control-cabina'
        return axios.get(url)
    },

    getPasajerosCotizacion(queryParams) {
        let url = servergps + resource
        return axios.get(url, queryParams)
    },

    getPasajero(id) {
        let url = servergps + resource + '/' + id        
        return axios.get(url)
    },

    updatePasajero(data, id) {        

        let url = servergps + resource + '/' + id
        return axios.patch(url, data)
    },

    storePasajero(data) {

        const url = servergps + resource
        return axios.post(url, data)

    },

    deletePasajero(data, id) {
        
        let url = servergps + resource + '/' + id
        return axios.delete(url, { data } )

    },

    cancelPassenger( request ){

        const { id } = request

        const url = servergps + resource + '/' + id + '/cancelar'
        return axios.patch(url, request)

    },







};