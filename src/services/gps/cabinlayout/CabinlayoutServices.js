import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/cabinlayout/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll(id) {
        let url = server + resource + 'getAll/';
        //return Axios.get(url);
        return Axios.get(url + id);
    },


    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    // getBeds() {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getBeds';
    //     return Axios.get(url);
    // },

    getLayoutBedsByLayId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getLayoutBedsByLayId/';
        return Axios.get(url + id);
    },

};