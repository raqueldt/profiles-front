import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/availability/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {

    data() {
        return {
            page: 1,
        }
    },

    /************************** STANDARS API ********************************/

    // 2021-07-14 | fg | informacion + disponibilidad de una salida
    getAvailabilityDeparture (depId) {
        let url = fullUrl + `get-availability-departure/${depId}`;
        return Axios.get(url);        
    },


    getAll() {
        //console.log(Axios.get(url));
        //let url = fullUrl + 'getAll? page=' + this.page;
        let url = fullUrl + 'getAll';
        return Axios.get(url);
    },

    getAllDecks() {
        let url = fullUrl + 'getAllDecks';
        return Axios.get(url);
        // return Axios.get(url + "/" + avaId);
    },

    getAllVess() {
        let url = fullUrl + 'getAllVess';
        return Axios.get(url);
        // return Axios.get(url + "/" + avaId);
    },

    getinforByAvailability(avaId) {
        let url = fullUrl + 'getinforByAvailability';
        return Axios.get(url + "/" + avaId);
    },

    getItinerariesbyAvailabilitygroupbyday(avaId) {
        let url = fullUrl + 'getItinerariesbyAvailabilitygroupbyday';
        return Axios.get(url + "/" + avaId);
    },

    getItinerariesbyAvailability(avaId) {
        let url = fullUrl + 'getItinerariesbyAvailability';
        return Axios.get(url + "/" + avaId);
    },
    getinforcabin(cabId) {
        let url = fullUrl + 'getinforcabin';
        return Axios.get(url + "/" + cabId);
    },

    getInfoRates(avaId) {
        let url = fullUrl + 'getInfoRates';
        return Axios.get(url + "/" + avaId);
    },
    getDeckCabSlot(depId) {
        let url = fullUrl + 'getDeckCabSlot';
        return Axios.get(url + "/" + depId);
    },
    querygetOffersBydepId(year, itinId) {
        let url = fullUrl + 'querygetOffersBydepId';
        return Axios.get(url + "/" + year + "/" + itinId);
    },

    // Nueva query para disponibilidad
    getAvailability(data) {
        let url = fullUrl + 'get-availability';
        return Axios.get(url, data);
    },
    // getAvailability(start, end) {
    //     let url = fullUrl + 'get-availability';
    //     return Axios.get(url + "/" + start + "/" + end);
    // },
    // getAvailability(data) {
    //     let url = fullUrl + "get-availability";
    //     return Axios.post(url, data);
    // },


    getInfobybosId(bosId) {
        let url = fullUrl + 'get-info-bosId';
        return Axios.get(url + "/" + bosId);
    },
    getInfoCabin(cabId) {
        let url = fullUrl + 'get-info-cabin';
        return Axios.get(url + "/" + cabId);
    },

};