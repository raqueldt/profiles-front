import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/publicrequest/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    addPublicRequest(data) {
        let url = server + resource + "add-public-request";
        return Axios.post(url, data);
    },
    getPublicRequest () {
        const url = server + resource + 'get-public-request';
        return Axios.get(url);
    },
    updateStatus(id, data) {
        let url = server + resource + "updateStatus/";
        return Axios.put(url + id, data);
    },    
};