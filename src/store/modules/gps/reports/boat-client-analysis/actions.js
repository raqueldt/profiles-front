import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;






//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'sales-clients-cruises'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const countries = [...data.countries]
    const cruises = [...data.cruises]
    

    commit('setData', ventas)

    commit('setCountries', countries)

    commit('setCruises', cruises)

}

//carga data del reporte
export const loadDataDetail = async ( { commit }, params ) => {


    const endpoint = url + 'sales-client-cruises'

    const { data } = await axios.get( endpoint, { params })

    const detailboatanalysis = [...data]
    

    commit('setDataDetail', detailboatanalysis)

 

}







