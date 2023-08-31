import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;

import CotizacionesServices from "@/services/gps/cotizaciones/CotizacionesServices";


//carga data del reporte
export const loadData = async ( { commit }, params ) => {


    const endpoint = url + 'sales-clients'

    const { data } = await axios.get( endpoint, { params })

    const ventas = [...data.ventas]
    const countries = [...data.countries]

    commit('setData', ventas)

    commit('setCountries', countries)

}




export const loadCotizacionTotales = async ( { commit }, cotId  ) => {


  const { data } = await CotizacionesServices.getCotizacion( cotId )

  const [ firstCotizacion ] = data
  const { quoteDetails: { subtotal: cotizacionTotales } } = firstCotizacion

  commit('setCotizacionTotales', cotizacionTotales)

}



