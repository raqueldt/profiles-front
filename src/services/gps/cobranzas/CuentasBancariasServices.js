import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/cuentas-bancarias/'
const server = Conf.servergps;

export default {

    addCuentaBancaria(data) {
        let url = server + resource + "add-cuenta-bancaria";
        return Axios.post(url, data);
    },

    getAllCuentasBancarias() {
        let url = server + resource + 'get-all-cuentas-bancarias';
        return Axios.get(url);
    },

    updateCuentaBancaria(id, data) {
        let url = server + resource + "update-cuenta-bancaria/";
        return Axios.put(url + id, data);
    },

    deleteCuentaBancaria(id) {
        let url = server + resource + 'delete-cuenta-bancaria';
        return Axios.delete(url+ '/' + id);
    },
 

};