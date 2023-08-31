
import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/itinerary/'
const server = Conf.servergps;
const url = server + resource;

export default {

    //2021-07-12 | fg | informaciòn itinerario  + summary + activities + species
    getSummaryItineraryFull(itiId){

        let url = `${server}${resource}${itiId}/summary-full`
        return Axios.get(url);

    },


    //12/08/2020 FS
    storeSimpleItinerary(data){

        let url = server + resource + 'store-simple-itinerary';
        return Axios.post(url,data);
    },
    //13-08-2020 fg guardar itinerario combinado
    storeCombinedItinerary(data) {

        let url = server + resource + 'store-combined-itinerary';
        return Axios.post(url, data);


    },

    //07-08-2020 fg
    getItinerarySummaryById( itiId){

        let url = server + resource + 'get-itinerary-summary-by-id' + '/' + itiId;
        return Axios.get(url);

    },

    //21-08-2020 fg agregar dìa inicio-fin
    //07-08-2020 fg Lista de itinerarios por vessel y modo
    getListByVesselBuilding( vslId, vslBuilMode ) {

        let url = server + resource + 'get-list-by-vessel-building' + '/' + vslId + '/' + vslBuilMode;
        return Axios.get(url);
    },

    //28-07-2020 fg Lista de itinerarios por vessel
    getListByVessel( vslId ) {

        let url = server + resource + 'get-list-by-vessel' + '/' + vslId;
        return Axios.get(url);
    },

    /************************** STANDARS API ********************************/
    getAllItineraries() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllItineraries';
        return Axios.get(url);
    },

    getAll(patId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url + "/" + patId);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    // getScheduleByStartDay(patId, schStartDay) {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getScheduleByStartDay';
    //     return Axios.get(url + "/" + patId + "/" + schStartDay);
    // },
    addItinerary(data) {
        let url = server + resource + "addItinerary";
        return Axios.post(url, data);
    },

    getItinerariesByPatent(patId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getItinerariesByPatent';
        return Axios.get(url + "/" + patId);
    },

    getItinerariesByPatent(patId,numNights) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getItinerariesByPatent';
        return Axios.get(url + "/" + patId+ "/" + numNights);
    },


    getAllItinerariesByPatent(patId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllItinerariesByPatent';
        return Axios.get(url + "/" + patId);
    },

    // FILTROS AVANZADOS AVAILABILITY

    getItinerariesByActivities(data) {
        let url = server + resource + 'getItinerariesByActivities';
        return Axios.post(url, data);
    },

    getItinerariesBySites(data) {
        let url = server + resource + 'getItinerariesBySites';
        return Axios.post(url, data);
    },

    getItinerariesBySpecies(data) {
        let url = server + resource + 'getItinerariesBySpecies';
        return Axios.post(url, data);
    },
    getGroupItinerariesByItinIds(itinId){
        let url = server + resource + 'getGroupItinerariesByItinIds';
        return Axios.get(url + "/" + itinId);

    }


};
