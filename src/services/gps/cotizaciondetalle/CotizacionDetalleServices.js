import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/cotizaciondetalle/'
const server = Conf.servergps;


export default {

    addCotizacionDetalle(data) {
        let url = server + resource + "addCotizacionDetalle";
        return Axios.post(url, data);
    },
    addnotedetailquote(data) {
        let url = server + resource + "addnotedetailquote";
        return Axios.post(url, data);
    },

    getDetailCotizacionDetalle(codId) {
        let url = server + resource + 'getDetailCotizacionDetalle';
        return Axios.get(url + "/" + codId);
    },
    deleteservice(codId) {
        let url = server + resource + 'deleteservice';
        return Axios.get(url + "/" + codId);
    },
    updatecotizaciondetalles(data) {
        let url = server + resource + 'update-detalle';
        return Axios.patch(url, data);
      },
      updateOrderArrayCotizaciones( data) {
        let url = server + resource + 'update-order-array-cotizaciones';
        return Axios.post(url, data);
      },      
};
