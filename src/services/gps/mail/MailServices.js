import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/mail/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    sendConfirmBlock() {
        //console.log(Axios.get(url));
        let url = server + resource + 'sendConfirmBlock';
        return Axios.get(url);
    },

    // sendQuotes(rowBookingSlots) {
    //   let url = server + resource + 'sendQuotes' + '/' + rowBookingSlots;
    //   return Axios.get(url);
    // },
    sendQuotes(data) {
        let url = server + resource + "sendQuotes";
        return Axios.post(url, data);
    },

    sendQuotescot(cotId,correo) {
        let url = server + resource + 'sendQuotescot';
        return Axios.get(url + "/" + cotId + "/" + correo);
    },
    sendGroupQuotescot(gctId,correo) {
        let url = server + resource + 'sendGroupQuotescot';
        return Axios.get(url + "/" + gctId + "/" + correo);
    },

    sendHold(data) {
        let url = server + resource + "sendHold";
        return Axios.post(url, data);
    },





};