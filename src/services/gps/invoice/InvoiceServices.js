import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/invoice/'
const server = Conf.servergps;


export default {
    store(data) {
        let url =
            server +
            resource +
            "store";
        return Axios.post(url, data);
    },
    
    show(cofId) {
        let url = server + resource ;
        return Axios.get(url + cofId + "/" + "show");
    },
    totalInvoices(cofId) {
        let url = server + resource ;
        return Axios.get(url + cofId + "/" + "totales");
    },
    update(invId, data) {
        let url =  server + resource;
        return Axios.patch(url+ invId + "/" + "update", data);
    },
    showInvoce(cofId, id) {
        let url = server + resource ;
        return Axios.get(url + cofId + "/" + id + "/" + "detail");
    },
    sendInvoce(cofId, id, correo, user) {
        let url = server + resource + 'sendInvoice';
        return Axios.get(url + "/" + cofId + "/" + id + "/" + correo + "/" + user);
    },
};