import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/departuressetup/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    addSetup(data) {
        let url = server + resource + "addSetup";
        return Axios.post(url, data);
    },
    updateSetup(id,data) {
        let url = server + resource + "updateSetup";
        return Axios.put(url+"/"+ id, data);
    },

    process(data) {
        let url = server + resource + "process";
        return Axios.post(url, data);
    },

    getItinerariesDeparturesSetup(itiId) {
        let url = server + resource + 'getItinerariesDeparturesSetup';
        // return Axios.get(url);
        return Axios.get(url + "/" + itiId);
    },




};
