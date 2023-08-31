import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/conditions/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getCatalog(cru_id,year,type) {
        let url = server + resource + 'getCruise';
        return Axios.get(url + "/" + cru_id+ "/" + year+ "/" + type);
    },
    getConditions(cru_id,year,type) {
        let url = server + resource + 'getConditions';
        return Axios.get(url + "/" + cru_id+ "/" + year+ "/" + type);
    },
    updateCondition(id, data) {
        let url = server + resource + 'updateCondition/';
        return Axios.put(url + id, data);
    },


};
