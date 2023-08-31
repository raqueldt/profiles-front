import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/layoutbed/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getBeds() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getBeds';
        return Axios.get(url);
    },

    getLayoutBedsByLayId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getLayoutBedsByLayId/';
        return Axios.get(url + id);
    },

    addBedCabin(data) {
        let url = server + resource + "addBedCabin";
        return Axios.post(url, data);
    },

    deleteService(id) {
        let url = server + resource + "deleteService";
        return Axios.delete(url + "/" + id);
    },
    getCapacityBedsByLayId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCapacityBedsByLayId/';
        return Axios.get(url + id);
    },

};