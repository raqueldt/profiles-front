import Axios from 'axios';
import Conf from '@/services/conf.js';
const axios = require('axios');
const resource = '/api/departures/'
const server = Conf.servergps;
const url = server + resource;

export default {

  // 2023-02-08 | fg | set fixed rate
  setFixedDiscountRate(params) {
    const { id } = params
    const url = server + resource + id +'/update-fixed-discount-rate'
    return Axios.patch(url, params)

  },

  // 2023-02-08 | fg | get fixed rate
  getFixedDiscountRate(id) {
    const url = server + resource + id +'/fixed-discount-rate'
    return Axios.get(url)
  },


  // 2022-11-17 | fg | requests log
  getRequestsLog(params) {
    const url = server + resource + 'requests-log'
    return Axios.get(url, { params })
  },



  // 2022-07-15 | fg | pricing history
  getPricingHistory(id, params) {

    const url = `${server}${resource}${id}/rate-management`
    return Axios.get(url, { params })

  },



    // 2021-06-28 | fg
    // Obtener las tarifas asociadas a una salida especifica
    getDepartureRates(id, params) {
        let url = `${server}${resource}${id}/rates`;
        return Axios.get(url, { params: { ...params } });
    },

    /************************** STANDARS API ********************************/
    getAllByDepId(depId) {
        let url = server + resource + 'getAllByDepId';
        return Axios.get(url + "/" + depId);
    },

    getAll(dpsId) {
        let url = server + resource + 'getAll';
        return Axios.get(url + "/" + dpsId);
    },
    getDepByDepId(depId) {
        let url = server + resource + 'getDepByDepId';
        return Axios.get(url + "/" + depId);
    },
    getItineraryByDepId(depId) {
        let url = server + resource + 'getItineraryByDepId';
        return Axios.get(url + "/" + depId);
    },
    getAllInDryDocks(dryId) {
        let url = server + resource + 'getAllInDryDocks';
        return Axios.get(url + "/" + dryId);
    },
    getAllDeparturesNotInDryDocks() {
        let url = server + resource + 'getAllDeparturesNotInDryDocks';
        return Axios.get(url);
    },
    getItinerarysbyCru(cruise, nights) {
        let url = server + resource + 'getItinerarysbyCru';
        return Axios.get(url + "/" + cruise + "/" + nights);
    },
    updateItinerarybydeparture(id, data) {
        let url = server + resource + "updateItinerarybydeparture";
        return Axios.put(url + "/" + id, data);
    },
    updateStatusbydeparture(id, data) {
        let url = server + resource + "updateStatusbydeparture";
        return Axios.put(url + "/" + id, data);
    },
    getDeparturesBetwinDates(startdate, enddate) {
        let url = server + resource + 'getDeparturesBetwinDates';
        return Axios.get(url + "/" + startdate + "/" + enddate);
    },
    getNumDepsByCruId(cruId) {
        let url = server + resource + 'getNumDepsByCruId';
        return Axios.get(url + "/" + cruId);
    },

    getHistoryDeparture(depId) {
        let url = server + resource + 'history-departure';
        return Axios.get(url + "/" + depId);
    },

};
