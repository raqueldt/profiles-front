
import Axios from 'axios';
import Conf from '@/services/conf.js';


const resource = '/api/reportes/administrativo/'
const servergps = Conf.servergps;

const url = servergps + resource;

export default {

  // 2023-03-06 | fg | reporte de ventas por itinerario
  getSalesFinancialDeparture( params ){
    const uri = url + 'financial-itinerary-departures'
    return Axios.get(uri, { params });
  },


  // 2023-02-03 | fg | reporte de ventas/target incluye compromiso de venta ( allotments )
  getCruiseSalesAllotmentOverview( params ) {
    const uri = url + 'financial-analysis-targets-allotment'
    return Axios.get(uri, { params });
  },


  // 2023-01-17 | fg |  lista de cruceros propios activos

  getCruiseSalesOverview( params ) {
      const uri = url + 'financial-analysis-targets'
      return Axios.get(uri, { params });
  },


};
