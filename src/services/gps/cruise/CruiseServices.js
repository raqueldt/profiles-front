import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/cruise/'
const server = Conf.servergps;
const url = server + resource;

export default {


    /*
    * 2022-05-18 | fg 
    * lista de cruceros propios activos
    */

    getOwnCruises() {
        //console.log(Axios.get(url));
        let url = server + resource + 'own-cruises';
        return Axios.get(url);
    },   


    /* 2021-06-28 | fg
    *  lista de precios/temporadas anuales por crucero
    *  params: cruId, crpYear
    */
    getCruiseYearPrices(params) {
        let url = server + resource + 'cruise-year-prices';
        return Axios.get(url, { params: { ...params } });
    },



    /************************** STANDARS API ********************************/

    getCruises() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCruises';
        return Axios.get(url);
    },


    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    getItinerariesInCruise(vslId) {
        let url = server + resource + 'getItinerariesInCruise';
        return Axios.get(url + "/" + vslId);
    },

    getCruisesByCategory() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCruisesByCategory';
        return Axios.get(url);
    },

    getCategory() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCategory';
        return Axios.get(url);
    },
    getCruisesCategoryByCruId(cruId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getCruisesCategoryByCruId';
        return Axios.get(url+ "/" + cruId);
    },
    getItinerariesByCruId(cruIds){
        let url = server + resource + 'getItinerariesByCruId';
        return Axios.get(url + "/" + cruIds);
    },
    getDecksByCruId(cruIds){
        let url = server + resource + 'getDecksByCruId';
        return Axios.get(url + "/" + cruIds);
    },
    getCabinsByCruId(cruIds){
        let url = server + resource + 'getCabinsByCruId';
        return Axios.get(url + "/" + cruIds);
    },
    getCruiseName(cruIds){
        let url = server + resource + 'getCruiseName';
        return Axios.get(url + "/" + cruIds);
    },
    getCruisePrices(cruId){
        let url = server + resource + 'getCruisePrices';
        return Axios.get(url + "/" + cruId);
    },
    getCruisePricesBycrpId(crpId){
        let url = server + resource + 'getCruisePricesBycrpId';
        return Axios.get(url + "/" + crpId);
    },
    getAllCruisePrices(cruId){
        let url = server + resource + 'getAllCruisePrices';
        return Axios.get(url + "/" + cruId);
    },
    getCruisePricesBycriId(cruId){
        let url = server + resource + 'getCruisePricesBycriId';
        return Axios.get(url + "/" + cruId);
    },
};
