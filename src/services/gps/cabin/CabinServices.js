import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/cabin/'
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

    getDecks() {
        let url = server + resource + 'getDecks';
        return Axios.get(url);
    },

    getCabinsByDeckId(decId) {
        let url = server + resource + 'getCabinsByDeckId';
        return Axios.get(url + "/" + decId);
    },

};
