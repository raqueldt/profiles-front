import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/bancos/'
const server = Conf.server;
const url = server + resource;

export default {
    getBancos() {
        let url = server + resource + 'get-bancos';
        return Axios.get(url);
    },
};