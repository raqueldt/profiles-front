import axios from 'axios'
//import conf from '../../services/conf'
import conf from '../../../../../services/conf';

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;

//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'sales-progress-start'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const clientes = [...data.clientes]

    commit('setData', ventas)

    commit('setClients', clientes)

}






