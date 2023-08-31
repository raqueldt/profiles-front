import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/speciessite/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    getSpeciesByPlace(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSpeciesByPlace/';
        return Axios.get(url + id);
    },

    getSpeciesBySite(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSpeciesBySite/';
        return Axios.get(url + id);
    },

    getSpeciesBySites(data) {
        let url = server + resource + 'getSpeciesBySites';
        return Axios.post(url, data);
    },

    addSpeciesSite(data) {
        let url = server + resource + "addSpeciesSite";
        return Axios.post(url, data);
    },

    deleteService(id) {
        let url = server + resource + "deleteService";
        return Axios.delete(url + "/" + id);
    },


};
