import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/snippettext/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAllSnippetText() {
        let url = server + resource + 'get-all-snippettext';
        return Axios.get(url);
    },

    getAllSnippetTextBySniId(sniId) {
        let url = server + resource + 'get-all-snippettext-by-sniid';
        return Axios.get(url + "/" + sniId);
    },


};