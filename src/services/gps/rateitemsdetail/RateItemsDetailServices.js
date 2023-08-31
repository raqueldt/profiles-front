import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/rateitemsdetail/'
const server = Conf.servergps;
const url = server + resource;

export default {

	getextradiscountdata(){
        //console.log(Axios.get(url));
        let url = server + resource + 'getextradiscountdata';
        return Axios.get(url);
    },

    deleteextradiscountbooking(id) {
        let url = server + resource + "deleteextradiscountbooking";
        return Axios.get(url + "/" + id);
    },
};
