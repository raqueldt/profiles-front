import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/pricing/'
const server = Conf.servergps;
const url = server + resource;

export default {


  //2022-08-25 | fg | extender una promocion express
  extendExpress( data ) {

    const url = server + resource + "extend-express"

    return Axios.patch(url, data)

  },

  //2022-08-24 | fg | finalizar una promocion express
  finishExpress( data ) {

    const url = server + resource + "finish-express"

    return Axios.patch(url, data)

  },

  //2022-07-22 | fg | crear promocion para salida especifica
  setDeparturePricing(data) {


    const url = server + resource + "set-departure-pricing"

    return Axios.post(url, data)

  },

	getRateManagement(){
        //console.log(Axios.get(url));
        let url = server + resource + 'getRateManagement';
        return Axios.get(url);
    },

	getRateManagementYearStatus(year,status){
        //console.log(Axios.get(url));
        let url = server + resource + 'get-rate-management-year-status' + '/' + year + '/' + status;
        return Axios.get(url);
    },

    getRateManagementYear(year){
        //console.log(Axios.get(url));
        let url = server + resource + 'get-rate-management-year' + '/' + year;
        return Axios.get(url);
    },
    getDeparturersIdStatus(depId){
        let url = server + resource + "getDeparturersIdStatus";
        return Axios.get(url+ '/' + depId);

    },
    getRateSetAdministrator(year, status) {
        let url = server + resource + 'getRateSetAdministrator' + '/' + year + '/' + status;
        return Axios.get(url);
    },
    getDeparturesByPromotion(rseId) {
        let url = server + resource + 'getDeparturesByPromotion' + '/' + rseId ;
        return Axios.get(url);
    },

    /************************** STANDARS API ********************************/
    addpricing(data) {
        let url = server + resource + "addpricing";
        return Axios.post(url, data);
    },
    addClientrate(data) {
        let url = server + resource + "addClientrate";
        return Axios.post(url, data);
    },
    addCountryRate(data) {
        let url = server + resource + "addCountryRate";
        return Axios.post(url, data);
    },
    updateByOrden(data) {
        let url = server + resource + "updateDpIdByOrden";
        return Axios.post(url, data);
    },
    queryGetClientsByrseId(rseId){
        let url = server + resource + "queryGetClientsByrseId";
        return Axios.get(url+ '/' + rseId);
    },
    queryGetdeparturesPricingByDepId(depId){
        let url = server + resource + "queryGetdeparturesPricingByDepId";
        return Axios.get(url+ '/' + depId);
    }
};
