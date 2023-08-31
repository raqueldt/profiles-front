import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/schedule/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/



    getAll(patId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllPatent';
        return Axios.get(url + "/" + patId);
    },

    getScheduleByPatId(patId, schStartDay) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getScheduleByStartDay';
        return Axios.get(url + "/" + patId + "/" + schStartDay);
    },

    getScheduleByPatId(patId,itinId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getScheduleByPatId';
        return Axios.get(url + "/" + patId+"/" +itinId);
    },

    getNightByPatId(patId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getNumNigthByPatent';
        return Axios.get(url + "/" + patId);
    },
    getitinNigth(shIds) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getitinNigth';
        return Axios.get(url + "/" + shIds);
    },

    delete(schid) {
        let url = server + resource + 'delete/';
        return Axios.post(url + schid);
    },
    
    updateByOrden(data) {
        let url = server + resource + "updateByOrden";
        return Axios.post(url, data);
    },
    showItem(schId){
        let url = server + resource + 'showItem';
        return Axios.get(url + "/" + schId);
    },


};