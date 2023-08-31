import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/feature/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAllByVslId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllByVslId/';
        return Axios.get(url + id);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    addVesselService(data) {
        let url = server + resource + "addVesselService";
        return Axios.post(url, data);
    },

    deleteService(id) {
        let url = server + resource + "deleteService";
        return Axios.delete(url + "/" + id);
    },

    updateByOrden(data) {
        let url = server + resource + "updateByOrden";
        return Axios.post(url, data);
    },

};