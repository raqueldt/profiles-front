import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/departureprice/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    addDepartureprice(data) {
        let url = server + resource + "addDepartureprice";
        return Axios.post(url, data);
    },
    addDeparturepricewithrateset(data) {
        let url = server + resource + "addDeparturepricewithrateset";
        return Axios.post(url, data);
    },

    /************************** APIs wizard availability ********************************/
    addDeparturepriceWizarAvailabity(data) {
        let url = server + resource + "addDeparturepriceWizarAvailabity";
        return Axios.post(url, data);
    },
    changeStatusDepPrice() {
        let url = server + resource + "changeStatusDepPrice";
        return Axios.get(url);
    },
    changeStatus(data) {
        let url = server + resource + "changeStatus";
        return Axios.post(url, data);
    },
    
    
    
};
