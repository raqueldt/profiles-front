import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/productos/'
const server = Conf.servergps;
const url = server + resource;

export default {

    getProductos() {
        let url = server + resource + 'getProductos';
        return Axios.get(url);
    },

    

};