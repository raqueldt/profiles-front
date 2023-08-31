import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/catalog_group/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    deleteGroupBycatalog(datos) {
        let url = server + resource + 'deleteGroupBycatalog';
        return Axios.post(url,datos);
    }


};
