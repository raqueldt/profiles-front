import Axios from 'axios';
//import Conf from '../conf.js';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/summary/'
const server = Conf.servergps;
const fullUrl = server + resource;

export default {


    // 21-08-2020 fg, ùnico procedimiento para guardar summary del itinerario
    storeSummary(data, id){
        let url = server + resource + "store-summary" +"/" + id;
        return Axios.post(url, data);
    },



    /************************** STANDARS API ********************************/


    // getAll(patId) {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getAll';
    //     return Axios.get(url + "/" + patId);
    // },

    // getScheduleByStartDay(patId, schStartDay) {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getScheduleByStartDay';
    //     return Axios.get(url + "/" + patId + "/" + schStartDay);
    // },

    // deleteAll(data) {
    //     let url = server + resource + 'deleteAll';
    //     return Axios.post(url, data);
    // },
    addSummary(data) {
        let url = server + resource + "addSummary";
        return Axios.post(url, data);
    },

    addCombinedSummary(data) {
        let url = server + resource + "addCombinedSummary";
        return Axios.post(url, data);
    },

    getSummaryByItiId(itiId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSummaryByItiId';
        return Axios.get(url + "/" + itiId);
    },

    deleteService(id) {
        let url = server + resource + "deleteService";
        return Axios.delete(url + "/" + id);
    },

    getactivitiesbysummary(sumId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getactivitiesbysummary';
        return Axios.get(url + "/" + sumId);
    },
    getspeciesbysummary(sumId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getspeciesbysummary';
        return Axios.get(url + "/" + sumId);
    },
    updateByOrden(data) {
        let url = server + resource + "updateByOrden";
        return Axios.post(url, data);
    },
    getSummaryByGroupItiId(intinIds) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSummaryByGroupItiId';
        return Axios.get(url + "/" + intinIds);
    },
    getitinCombinedNigth(intinIds) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getitinCombinedNigth';
        return Axios.get(url + "/" + intinIds);
    },

    countItineraryNigth(sumId){
        let url = server + resource + 'countItineraryNigth';
        return Axios.get(url + "/" + sumId);
    }

};
