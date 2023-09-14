import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/posiciondepartamento/'
const server = Conf.server;
const url = server + resource;

export default {


    /***********************************************************/

    getPosicionDepartamento() {
        let url = server + resource + 'getPosicionDepartamento';
        return Axios.get(url);
    },

    updatePosicionDepartamento(id, data) {
        let url = server + resource + 'updatePosicionDepartamento/';
        return Axios.put(url + id, data);
    },

    addPosicionDepartamento(data) {
        let url = server + resource + "addPosicionDepartamento";
        return Axios.post(url, data);
    },

    deletePosicionDepartamento(id) {
        let url = server + resource + 'deletePosicionDepartamento';
        return Axios.delete(url + "/" + id);
    },


};