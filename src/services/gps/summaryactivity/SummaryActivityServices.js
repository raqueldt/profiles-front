import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/summaryactivity/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    addSummaryActivities(data) {
        let url = server + resource + "addSummaryActivities";
        return Axios.post(url, data);
    },

    updateSummaryActivities(id,data) {
        let url = server + resource + "updateSummaryActivities";
        return Axios.post(url+"/"+id,data);
    },

    getLands() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getLands';
        return Axios.get(url);
    },
    getDifficult() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getDifficult';
        return Axios.get(url);
    },
    destroyactivity(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'destroyactivity';
        return Axios.get(url+"/"+id);
    },

    getSummaryActivitiesByItiIds(data) {
        let url = server + resource + 'getSummaryActivitiesByItiIds';
        return Axios.post(url, data);
    },
    activitiesnotInSumId(sumid){
        let url = server + resource + 'activitiesnotInSumId';
        return Axios.get(url+"/"+sumid);
    },

    addSummActivities(data) {
        let url = server + resource + 'addSummActivities';
        return Axios.post(url, data);
    },

};
