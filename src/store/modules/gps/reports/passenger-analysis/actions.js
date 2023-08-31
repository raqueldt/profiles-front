import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;






//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'passenger-analysis'

    const { data } = await axios.get( endpoint, { params })
    

    commit('setData', data)
    

}






