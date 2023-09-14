import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/roles/'
const server = Conf.server;
const url = server + resource;

export default {
    getRoles() {
        let url = server + resource + 'get-roles';
        return Axios.get(url);
    },
};