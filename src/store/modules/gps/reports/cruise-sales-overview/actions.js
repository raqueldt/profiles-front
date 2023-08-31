import axios from 'axios'
import conf from '@/services/conf.js'

const resource = '/api/reportes/administrativo/'

const server = conf.servergps

const url = server + resource;






//carga data del reporte
export const fetchCruiseSalesTargets = async ( { commit }, params ) => {

  const { cruise } = params

  const endpoint = url + 'financial-analysis-targets'

  const { data } = await axios.get( endpoint, { params })

  commit('setData', { cruise , data  })

}








