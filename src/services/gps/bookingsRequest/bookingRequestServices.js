import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/bookingrequest/'
const server = Conf.servergps;

export default {

    getRequestByRequId(reqId) {
        let url = server + resource + 'getRequestByRequId';
        return Axios.get(url + "/" + reqId);
    },

    updateStatusQuote(reqId) {
        let url = server + resource + 'updateStatusQuote' + '/' + reqId;
        return Axios.post(url);
    },

    getBookingsByReqId(reqId) {
        let url = server + resource + 'getBookingsByReqId';
        return Axios.get(url + "/" + reqId);
    },

    confirmQuote(reqId,cotId) {
        let url = server + resource + 'confirmQuote'+ '/' + reqId+ '/' + cotId;
        return Axios.post(url);
    },

};