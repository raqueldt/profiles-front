import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/bed/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    deleteBed(bed_id) {
        let url = server + resource + 'deleteBed';
        return Axios.post(url+'/'+bed_id);
    },

};
