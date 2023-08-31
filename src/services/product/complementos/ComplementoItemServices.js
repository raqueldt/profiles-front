import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/complementositem/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {

    getAllComplementosItem() {
        let url = fullUrl + 'get-all-complementos-item';
        return Axios.get(url);
    },

    getAllComplementosItemCmpId(cmpId) {
        let url = server + resource + 'get-complementos-item-by-cmpid';
        return Axios.get(url + "/" + cmpId);
    },
    
    getAllComplementosItemCmIId(cmpId) {
        let url = server + resource + 'get-complementos-item-by-cmiid';
        return Axios.get(url + "/" + cmpId);
    },    

    addComplementoItem(data){
        let url = fullUrl + 'add-complemento-item';
        return Axios.post(url,data);
    },

    updateComplementoItem(id, data) {
        let url = server + resource + "update-complemento-item/";
        return Axios.put(url + id, data);
    },
    deleteComplementoItem(id) {
        let url = server + resource + 'delete-complemento-item';
        return Axios.delete(url + "/" + id);
    },      


};