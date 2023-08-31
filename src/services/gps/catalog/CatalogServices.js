import Axios from 'axios';
import Conf from '../conf.js';
const axios = require('axios');
const resource = '/api/catalog/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/



    getCatalogsByVslId(vslId) {
        let url = server + resource + 'getCatalogsByVslId';
        return Axios.get(url + "/" + vslId);
    },

    getCatalogGroupByCatId(catId) {
        let url = server + resource + 'getCatalogGroupByCatId';
        return Axios.get(url + "/" + catId);
    },

    getItinerariesByCruId(cruId) {
        let url = server + resource + 'getItinerariesByCruId';
        return Axios.get(url + "/" + cruId);
    },
    getItinerariesByCruIds(data) {
        let url = server + resource + 'getItinerariesByCruIds';
        return Axios.post(url, data);
    },

    editname(datos) {
        let url = server + resource + 'editname';
        return Axios.put(url, datos);
    },

    getThemes(cru_id) {
        let url = server + resource + 'getThemes';
        return Axios.get(url + "/" + cru_id);
    },
    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },
    getCatalogsByCruIds(cru_id,catId) {
        let url = server + resource + 'getCatalogsByCruIds';
        return Axios.get(url + "/" + cru_id+ "/" +catId);
    },


};
