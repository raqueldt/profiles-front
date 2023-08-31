import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/distance/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    getAll() {
        
        let url = server + resource + 'getAll';
        console.log(Axios.get(url));
        return Axios.get(url);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

};