import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;






//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'sales-clients'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const countries = [...data.countries]

    commit('setData', ventas)

    commit('setCountries', countries)

}




//carga data del reporte
export const loadDetails = async ( { commit }, params ) => {


    const endpoint = url + 'sales-client'

    const { data } = await axios.get( endpoint, { params })

    commit('setDetails', data)

}


