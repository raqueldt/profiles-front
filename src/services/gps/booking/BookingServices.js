import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/booking/'
const resource1 = '/api/departures/'
const server = Conf.servergps;


export default {

  // 2022-11-18 | fg | booking history log
  getBookingHistoryLog(params) {
    const url = server + resource + 'history-log'
    return Axios.get(url, { params })
  },


  // 2022-07-06 | fg | update children discount
  updateChildrenDiscount( params ) {
    const url = server + resource + "update-children-discount"
    return Axios.patch(url, params)
  },

  getBookingDetails(bokId) {
     let url = server + resource;
     return Axios.get(url + bokId + "/details");
  },

    /************************** STANDARS API ********************************/
    getinformationBooking(bokId) {
        let url = server + resource + 'getinformationBooking';
        return Axios.get(url + "/" + bokId);
    },
    updatejusttimelimit(data) {
        let url = server + resource + "updatejusttimelimit";
        return Axios.post(url, data);
    },
    gettotaldiscountbybooking(bokId) {
        let url = server + resource + 'gettotaldiscountbybooking';
        return Axios.get(url + "/" + bokId);
    },
    getBookingsToExpire() {
        let url = server + resource + 'get-bookings-to-expire';
        return Axios.get(url);
    },

    deleteextradiscountbooking(bsrId) {
        let url = server + resource + 'deleteextradiscountbooking';
        return Axios.get(url + "/" + bsrId);
    },
    getinforslotsbybooking(bokId) {
        let url = server + resource + 'getinforslotsbybooking';
        return Axios.get(url + "/" + bokId);
    },
    getinforslotsbybookinggeneral(bokId) {
        let url = server + resource + 'getinforslotsbybookinggeneral';
        return Axios.get(url + "/" + bokId);
    },
    getdeparturebyavailability(depId) {
        let url = server + resource + 'getdeparturebyava';
        return Axios.get(url + "/" + depId);
    },
    getinformationcabin(depId) {
        let url = server + resource + 'getinformationcabin';
        return Axios.get(url + "/" + depId);
    },

    getinformationdeck(depId) {
        let url = server + resource1 + 'getinformationdeck';
        return Axios.get(url + "/" + depId);
    },
    getRateItemsDetails() {
        let url = server + resource + 'getRateItemsDetails';
        return Axios.get(url);
    },
    addExtraRateSlot(data) {
        let url = server + resource + "addExtraRateSlot";
        return Axios.post(url, data);
    },

    getRateItemsDetailsValues(id) {
        let url = server + resource + 'getRateItemsDetailsValues';
        return Axios.get(url + "/" + id);
    },

    addBookingHoldProcess(data) {
        let url = server + resource + "addBookingHoldProcess";
        return Axios.post(url, data);
    },

    addBookingPreHold(data) {
        let url = server + resource + "addBookingPreHold";
        return Axios.post(url, data);
    },

    getRequestByDepIdAndCliId(cliId) {
        let url = server + resource + 'getRequestByDepIdAndCliId';
        return Axios.get(url + "/" + cliId);
    },

    getRequestByDepId(depId) {
        let url = server + resource + 'getRequestByDepId';
        return Axios.get(url + "/" + depId);
    },
    addCategoryDiscount(data) {
        let url = server + resource + "addCategoryDiscount";
        return Axios.post(url, data);
    },
    addSubCategoryDiscount(data) {
        let url = server + resource + "addSubCategoryDiscount";
        return Axios.post(url, data);
    },
    getCategory() {
        let url = server + resource + 'getCategory';
        return Axios.get(url);
    },
    updateStatusSlotByTimeLimit() {
        let url = server + resource + 'updateStatusSlotByTimeLimit';
        return Axios.get(url);
    },

    getAllDataBoking(bokId) {
        let url = server + resource + 'getAllDataBoking';
        return Axios.get(url + "/" + bokId);
    },

    editname(datos) {
        let url = server + resource + 'editname';
        return Axios.put(url, datos);
    },

    updateSlotsFromBooking(data) {
        let url = server + resource + 'updateSlotsFromBooking';
        return Axios.post(url, data);
    },
    UpdateCotizacionesDetailExtraDiscount(bokId) {
        let url = server + resource + 'UpdateCotizacionesDetailExtraDiscount';
        return Axios.get(url + "/" + bokId);
    },

    updateTimeLimit(data) {
        let url = server + resource + "update-time-limit";
        return Axios.patch(url, data);
    },

    addAuditChangeClientPercentage(data) {
        let url = server + resource + "add-audit-change-client-percentage";
        return Axios.post(url, data);
    },

    updateReference(data) {
        let url = server + resource + "update-reference";
        return Axios.patch(url, data);
    },    

    updateClient(data) {
        let url = server + resource + "update-client";
        return Axios.patch(url, data);
    },    
};
