import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/summaryspecies/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    addSummarySpecies(data) {
        let url = server + resource + "addSummarySpecies";
        return Axios.post(url, data);
    },

    destroyspecies(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'destroyspecies';
        return Axios.get(url+"/"+id);
    },
    speciesnotInSumId(sumid){
        let url = server + resource + 'speciesnotInSumId';
        return Axios.get(url+"/"+sumid);
    },
    addSummSpecies(data) {
        let url = server + resource + "addSummSpecies";
        return Axios.post(url, data);
    },
};