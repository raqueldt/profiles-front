import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/site/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'get-sites';
        return Axios.get(url);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    getSitesByItiIds(data) {
        let url = server + resource + 'getSitesByItiIds';
        return Axios.post(url, data);
    },

};