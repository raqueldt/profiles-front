import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/prestacionclase/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {

    getAllPrestacionesClase() {
        let url = fullUrl + 'get-all-prestaciones-clase';
        return Axios.get(url);
    },

    getAllPrestacionClaseByPreId(preId) {
        let url = server + resource + 'get-prestacion-clase-by-preid';
        return Axios.get(url + "/" + preId);
    }, 

    getAllPrestacionClaseByPclId(pclId) {
        let url = server + resource + 'get-prestacion-clase-by-pclid';
        return Axios.get(url + "/" + pclId);
    },    

    addPrestacionClase(data){
        let url = fullUrl + 'add-prestacion-clase';
        return Axios.post(url,data);
    },

    updatePrestacionClase(id, data) {
        let url = server + resource + "update-prestacion-clase/";
        return Axios.put(url + id, data);
    },

    deletePrestacion(id) {
        let url = server + resource + 'delete-prestacion-clase';
        return Axios.delete(url + "/" + id);
    },    


};