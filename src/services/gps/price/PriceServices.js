import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/price/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    updatePrice(id, data) {
        let url = server + resource + 'updatePrice/';
        return Axios.put(url + id, data);
    },

    newRate(data) {
        let url = server + resource + "newRate";
        return Axios.post(url, data);
    },
    newSeason(data) {
        let url = server + resource + "newSeason";
        return Axios.post(url, data);
    },
    emptyRack(data) {
        let url = server + resource + "emptyRack";
        return Axios.post(url, data);
    }

};
