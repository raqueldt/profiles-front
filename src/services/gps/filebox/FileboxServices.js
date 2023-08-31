import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/filebox/'
const server = Conf.servergps;
const url = server + resource;

export default {
    serverUrl: server,
    urlAddImage: server + resource + 'addImage',
    urlCabinsImage: server + '/images/cabins/',
    urlDeckImage: server + '/images/decks/',
    urlDefaulImages: server + '/images/default_images/',
    urlPreviewImage: server + '/images/confirmations/',

    addImage(data) {
        let url = server + resource + 'addImage';
        return Axios.post(url, data);
    },

    getImagesFromCofId(id) {
        let url = server + resource + 'getImagesFromCofId';
        return Axios.get(url + '/' + id);
    },

    deleteImageFromCofId(cofId, userId) {
        let url = server + resource + 'deleteImageFromCofId';
        return Axios.delete(url + "/" + cofId + "/" + userId);
    },

};