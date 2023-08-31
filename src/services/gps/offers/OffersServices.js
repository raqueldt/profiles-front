import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/offers/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/



    getOffersByItiId(itiId) {
        let url = server + resource + 'getOffersByItiId';
        return Axios.get(url + "/" + itiId);
    },

    updateOffer(id, data) {
        let url = server + resource + 'updateOffer/';
        return Axios.put(url + id, data);
    },

    updateBaseRate(id, data) {
        let url = server + resource + 'updateBaseRate/';
        return Axios.put(url + id, data);
    },

    updateGrossRate(id, data) {
        let url = server + resource + 'updateGrossRate/';
        return Axios.put(url + id, data);
    },

    getRequestsRatesLog(depId, offId) {
        let url = server + resource + 'requests-log-rates';
        return Axios.get(url + "/" + depId + "/" + offId);
    },    

};