import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/dashboard/'
const server = Conf.servergps;


export default {

  getBookingsAudits(tipo) {
      let url = server + resource + 'getBookingsAudits';
      return Axios.get(url + "/" + tipo);
  },

  getActiveQuotes() {
    let url = server + resource + 'get-latest-quotes';
    return Axios.get(url);
  },
/*   getActivityUser() {
    let url = server + resource + 'get-latest-quotes';
    return Axios.get(url);
  }, */

  getActivityUser(userId) {
    let url = server + resource + 'get-activity-user';
    return Axios.get(url + "/" + userId);
},


  getConfirmations() {
    let url = server + resource + 'get-confirmations';
    return Axios.get(url);
  },
 
  getHistoryConfirmation(codfId) {
    let url = server + resource + "get-history-confirmation";
    return Axios.get(url + "/" + codfId);
},


  getPaxCountry() {
    let url = server + resource + 'get-pax-country';
    return Axios.get(url);
  },



};
