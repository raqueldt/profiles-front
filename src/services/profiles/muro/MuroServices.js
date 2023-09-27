import Axios from "axios";
import Conf from "../../conf.js";
const axios = require("axios");
const resource = "/api/muro/";
const server = Conf.server;
const url = server + resource;

export default {
    urlImagenMuro: server + "/img/muro/",
    /*************************************************Ñ**********/
    getTodosRegistrosMuro() {
        let url = server + resource + "getTodosRegistrosMuro";
        return Axios.get(url);
    },
    getAllRegistrosMuro() {
        let url = server + resource + "getAllRegistrosMuro";
        return Axios.get(url);
    },

    getUltimoRegistroMuro() {
        let url = server + resource + "getUltimoRegistroMuro";
        return Axios.get(url);
    },
    getCategorias() {
        let url = server + resource + "getCategorias";
        return Axios.get(url);
    },

    createMuro(data) {
        let url = server + resource + "createMuro";
        return Axios.post(url, data);
    }
};