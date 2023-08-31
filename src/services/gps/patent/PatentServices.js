import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/patent/'
const server = Conf.server;
const url = server + resource;

export default {

    getPatentScheduleByVessel(idVessel){
        let url = server + resource + `get-patent-schedule-by-vessel/${idVessel}`;
        return Axios.get(url);
    },



    /************************** STANDARS API ********************************/

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    getPatentByBoat(idboat){
        let url = server + resource + 'getPatentByBoat';
        return Axios.get(url + "/" + idboat);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },



};
