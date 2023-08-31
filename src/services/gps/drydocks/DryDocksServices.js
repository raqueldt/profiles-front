import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/drydocks/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    getAllByVslId(vslId) {
        let url = server + resource + 'getAllByVslId';
        return Axios.get(url + "/" + vslId);
    },

    addDock(data) {
        let url = server + resource + "addDock";
        return Axios.post(url, data);
    },
    updateStatus(id, data) {
        let url = server + resource + "updateStatus";
        return Axios.put(url + "/" + id, data);
    },

};