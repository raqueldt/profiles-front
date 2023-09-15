import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/cargasfamiliares/'
const server = Conf.server;
const url = server + resource;

export default {


    /***********************************************************/

    getCargasByUsersId(id) {
        let url = server + resource + 'get-cargas-by-users-id';
        return Axios.get(url + '/' + id);
    },

    getAllCargasFamiliares() {
        let url = server + resource + 'get-all-cargas-familiares';
        return Axios.get(url);
    },

    deleteCargaFamiliar(id) {
        let url = server + resource + 'delete-carga-familiar';
        return Axios.delete(url + "/" + id);
    },

    createCargaFamiliar(data) {
        let url = server + resource + "create-carga-familiar";
        return Axios.post(url, data);
    },

    updateEstadoCargaFamiliar(id, data) {
        let url = server + resource + "update-estado-carga-familiar/";
        return Axios.put(url + id, data);
    },

    // deleteAll(data) {
    //     let url = server + resource + 'deleteAll';
    //     return Axios.post(url, data);
    // },

    // // Sin usar:
    // getColaboradoresByDepId(id) {
    //     let url = server + resource + 'getColaboradoresByDepId';
    //     return Axios.get(url + '/' + id);
    // },

    // getMailVentasAndMarketing() {
    //     let url = server + resource + 'getMailVentasAndMarketing';
    //     return Axios.get(url);
    // },




};