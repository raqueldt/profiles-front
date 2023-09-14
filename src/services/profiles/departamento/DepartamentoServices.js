import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/departamento/'
const server = Conf.server;
const url = server + resource;

export default {


    /***********************************************************/

    getEstructuraOrganizacional() {
        let url = server + resource + 'getEstructuraOrganizacional';
        return Axios.get(url);
    },

    updateColaborador(id, data) {
        let url = server + resource + 'updateColaborador/';
        return Axios.put(url + id, data);
    },

    addDepartamento(data) {
        let url = server + resource + "addDepartamento";
        return Axios.post(url, data);
    },

    updateDepartamento(id, data) {
        let url = server + resource + 'updateDepartamento/';
        return Axios.put(url + id, data);
    },
    deleteDepartamento(id) {
        let url = server + resource + 'deleteDepartamento';
        return Axios.delete(url + "/" + id);
    },
    getColaboradores() {
        let url = server + resource + 'getColaboradores';
        return Axios.get(url);
    },

};