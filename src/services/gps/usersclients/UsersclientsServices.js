
import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/clientes/'
const server = Conf.servergps;
const url = server + resource;

export default {

    getAllIUsersClients() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getClientsUsers';
        return Axios.get(url);
    }

};
