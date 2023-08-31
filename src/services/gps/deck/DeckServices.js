import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/deck/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    getAllByVslId(vslId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllByVslId';
        return Axios.get(url + "/" + vslId);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

};
