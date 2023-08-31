import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/waitinglist/'
const server = Conf.servergps;
const url = server + resource;

export default {

    getWaitingListByDepId(depId) {
        let url = server + resource + 'get-waiting-list-by-depId' + '/' + depId;
        return Axios.get(url);
    },
    getWaitingListByUserId(userId) {
        let url = server + resource + 'get-waiting-list-by-userId' + '/' + userId;
        return Axios.get(url);
    },

    addWaitingList(data) {
        let url = server + resource + 'add-waiting-list';
        return Axios.post(url, data);
    },

    updateStatus(id, data) {
        let url = server + resource + "updateStatus/";
        return Axios.put(url + id, data);
    },

    deleteWaitingListById(id) {
        let url = server + resource + 'delete-waiting-list-by-id';
        return Axios.delete(url + "/" + id);
    },
};