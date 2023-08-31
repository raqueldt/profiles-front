import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/snippets/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAllSnippets() {
        //console.log(Axios.get(url));
        let url = server + resource + 'get-all-snippets';
        return Axios.get(url);
    },



};