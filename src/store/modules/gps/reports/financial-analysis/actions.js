import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;






//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'financial-analysis'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const cruises = [...data.cruises]


    commit('setData', ventas)

    commit('setCruises', cruises)

    

}

export const loadDataDepartures = async ( { commit }, params ) => {


    const endpoint = url + 'financial-analysis-departures'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.data]
    const cruises = [...data.cruises]
    const nights = [...data.nights]
    

    commit('setData', ventas)

    commit('setCruises', cruises)

    commit('setNights', nights)
    

}







