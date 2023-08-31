import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/complementos/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {

    getAllComplementos() {
        let url = fullUrl + 'get-all-complementos';
        return Axios.get(url);
    },

    getAllComplementosByCmpId(cmpId) {
        let url = server + resource + 'get-complementos-by-cmpid';
        return Axios.get(url + "/" + cmpId);
    },    

    addComplemento(data){
        let url = fullUrl + 'add-complemento';
        return Axios.post(url,data);
    },

    updateComplemento(id, data) {
        let url = server + resource + "update-complemento/";
        return Axios.put(url + id, data);
    },


};