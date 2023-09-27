import Axios from "axios";
import Conf from "../../conf.js";
const axios = require("axios");
const resource = "/api/reaccionesmuro/";
const server = Conf.server;
const url = server + resource;

export default {

    getReaccionesPorMuroId(id) {
        let url = server + resource + 'get-reacciones-by-muro-id';
        return Axios.get(url + "/" + id);
    },

    getReaccionesPorUsersId(muroId, usersId, ) {
        let url = server + resource + 'get-reacciones-by-users-id';
        return Axios.get(url + "/" + muroId + "/" + usersId);
    },

    addLike(data) {
        let url = server + resource + "add-like";
        return Axios.post(url, data);
    },
    addDisLike(data) {
        let url = server + resource + "add-dislike";
        return Axios.post(url, data);
    }

};