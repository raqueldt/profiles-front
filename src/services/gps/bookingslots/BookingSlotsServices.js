import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/bookingslots/'
const server = Conf.servergps;

export default {
    /************************** STANDARS API ********************************/

    //2022-07-06 | fg | actualizar tarifa slot
    updateSlotRate ( params ) {

      const url = server + resource + "update-slot-rate"
      return Axios.patch(url, params)

    },



    //FS: 2021/10/20
    getBookingEditParams(bosId) {
        let url = server + resource + bosId + "/" + "booking-edit-params";
        return Axios.get(url);
    },

    getSlotsByDepId(depId) {
        let url = server + resource + "getSlotsByDepId";
        return Axios.get(url + "/" + depId);
    },

    getSharesOnBookingSlots(cabId, depId) {
        let url =
            server + resource + "getSharesOnBookingSlots" + "/" + cabId + "/" + depId;
        return Axios.get(url);
    },

    updateStatus(id, data) {
        let url = server + resource + "update-status/";
        return Axios.put(url + id, data);
    },

    updateSlotRelocation(data) {
        let url = server + resource + "update-slot-relocation";
        return Axios.post(url, data);
    }
};
