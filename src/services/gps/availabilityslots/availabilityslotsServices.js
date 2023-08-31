import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/availabilityslots/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    getAll(id, cliId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        // return Axios.get(url + "/" + id);
        return Axios.get(url + "/" + id + "/" + cliId);
    },

    getAllDecks(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllDecks';
        return Axios.get(url + "/" + id);
    },

    getAllCabins(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllCabins';
        return Axios.get(url + "/" + id);
    },
    getAllCabins(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllCabins';
        return Axios.get(url + "/" + id);
    },
    getStatusSlotsByDepIdCabId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getStatusSlotsByDepIdCabId';
        return Axios.get(url + "/" + id);
    },
    getCabinsSlotsBydepIdGroupBycabin() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCabinsSlotsBydepIdGroupBycabin';
        return Axios.get(url);
    },
    getSlotsBydepIdandCabId(id, cabId, index) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSlotsBydepIdandCabId';
        return Axios.get(url + "/" + id + "/" + cabId + "/" + index);
    },
    getCabinsSlotsBydepId(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCabinsSlotsBydepId';
        return Axios.get(url + "/" + id);
    },

    // getAllConditionsSlots(id) {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getAllConditionsSlots';
    //     return Axios.get(url + "/" + id);
    // },

    // ******************************** SERVICES  STANDAR O POR TEMPORADA **************************
    checkPromotionsByDepId(id, cabId) {
        let url = server + resource + 'checkPromotionsByDepId';
        return Axios.get(url + "/" + id + "/" + cabId);
    },
    checkAccessPromotionByRseId(rseId) {
        let url = server + resource + 'checkAccessPromotionByRseId';
        return Axios.get(url + "/" + rseId);
    },
    getStandarSeason(avsId) {
        let url = server + resource + 'getStandarSeason';
        return Axios.get(url + "/" + avsId);
    },
    getSlotsByDepIdCabId(depId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getSlotsByDepIdCabId';
        return Axios.get(url + "/" + depId);
    },
    getAnySeason(avsId) {
        let url = server + resource + 'getAnySeason';
        //return Axios.get(url);
        return Axios.get(url + "/" + avsId);
    },
    getCharterSeason(avsId) {
        let url = server + resource + 'getCharterSeason';
        return Axios.get(url + "/" + avsId);
    },
    getAllCharter(id, cliId) {
        let url = server + resource + 'getAllCharter';
        return Axios.get(url + "/" + id + "/" + cliId);
    },
    promotionByDeparture(depId) {
        let url = server + resource + 'promotion-by-departure';
        return Axios.get(url + "/" + depId);
    },
    validateErrorCombinedItineraries(avsId) {
        let url = server + resource + 'validate-errors-combined-itineraries';
        return Axios.get(url + "/" + avsId);
    },

};