import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/pasajero/'
const server = Conf.servergps;


export default {
    getPaxList(cofId) {
        let url = server + resource + 'getPaxList';
        return Axios.get(url + "/" + cofId);
    },
    getAllpaises() {
        let url = server + resource + 'getAllpaises';
        return Axios.get(url);
    },
    getPaxInformation(pasId) {
        let url = server + resource + 'getPaxInformation';
        return Axios.get(url + "/" + pasId);
    },
    updatePaxInf(data) {
        let url = server + resource + 'updatePaxInf';
        return Axios.post(url, data);
    },
    saveChildPaxList(data) {
        let url = server + resource + 'saveChildPaxList';
        return Axios.post(url, data);
    },
    updateChildrenInf(data) {
        let url = server + resource + 'updateChildrenInf';
        return Axios.post(url, data);
    },
    borrarChildren(lpaId) {
        let url = server + resource + 'borrarChildren';
        return Axios.get(url + "/" + lpaId);
    },
};