import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;

import ConfirmacionServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";


//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'sales-clients'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const countries = [...data.countries]

    commit('setData', ventas)

    commit('setCountries', countries)

}

export const getTotalConfirmacionAction = async ({ commit }, cofId ) => {


  const { data } = await ConfirmacionServices.totalesConfirmacion(cofId)

  commit('setTotalConfirmacion', data.total)

  // 2022-09-06 | fg | asignar objeto totales
  commit('setConfirmationTotals', data )



}




