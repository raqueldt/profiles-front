import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/prestaciones/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {

    getAllPrestaciones() {
        let url = fullUrl + 'get-all-prestaciones';
        return Axios.get(url);
    },

    getAllPrestacionByPreId(preId) {
        let url = server + resource + 'get-prestacion-by-preid';
        return Axios.get(url + "/" + preId);
    },    

    addPrestacion(data){
        let url = fullUrl + 'add-prestacion';
        return Axios.post(url,data);
    },

    updatePrestacion(id, data) {
        let url = server + resource + "update-prestacion/";
        return Axios.put(url + id, data);
    },


};