import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/place/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    getAll() {
        
        let url = server + resource + 'placeAll';
        console.log(Axios.get(url));
        return Axios.get(url);
    },

    deleteAllPlace(data) {
        let url = server + resource + 'deleteAllPlace';
        return Axios.post(url, data);
    },
    getSpeciesByplaId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSpeciesByplaId/';
        return Axios.get(url + id);
    },
    getSpecies(id) {
        
        let url = server + resource + 'getSpecies/';
        console.log(Axios.get(url));
        return Axios.get(url + id);
    },
    addspecieplace(data) {
        let url = server + resource + "addspecieplace";
        return Axios.post(url, data);
    },
    deleteSpecie(id) {
        let url = server + resource + "deleteSpecie";
        return Axios.delete(url + "/" + id);
    },


};