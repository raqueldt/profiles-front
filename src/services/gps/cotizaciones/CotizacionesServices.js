import Axios from "axios";
import Conf from "../../conf.js";
const axios = require("axios");
const resource = "/api/cotizaciones/";
const server = Conf.servergps;

export default {

    /* FS 2022/07/25 */
    search( params ){

        const url = server + resource + 'search'
        return Axios.get(url, { params })

    },

    getCotizacionDetalleBygctId(gctId) {
        let url = server + resource + "getCotizacionDetalleBygctId";
        return Axios.get(url + "/" + gctId);
    },
    getInfoCotizacion(cotId) {
        let url = server + resource + "get-info-cotizacion";
        return Axios.get(url + "/" + cotId);
    },
    historyQuote(cotId) {
        let url = server + resource + "get-history-cotizacion";
        return Axios.get(url + "/" + cotId);
    },




    getChildPaxByCotId(cotId) {
        let url = server + resource + "getChildPaxByCotId";
        return Axios.get(url + "/" + cotId);
    },

    /* 2022-10-14 | fg | duplicado ???
    cancelquote(cotid, bokid) {
        // let url = server + resource + 'getSharesOnBookingSlots';
        //return Axios.get(url + "/" + cabId);
        let url = server + resource + "cancelquote" + "/" + cotid + "/" + bokid;
        return Axios.get(url);
    },
    */


    getCotizacionDetalleByCotId(codId) {
        let url = server + resource + "getCotizacionDetalleByCotId";
        return Axios.get(url + "/" + codId);
    },
    getInfoQuotebyAddServices(codId) {
        let url = server + resource + "get-info-quote-by-add-services";
        return Axios.get(url + "/" + codId);
    },
    cotizacionesdetalles(cotId) {
        let url = server + resource;
        return Axios.get(url + cotId + "/detalles");
    },

    getCotizacion(cotId) {
        let url = server + resource;
        return Axios.get(url + cotId + "/detalles");
    },




    totalescotizacion(cotId) {
        let url = server + resource;
        return Axios.get(url + cotId + "/totales");
    },

    updatePeriodo(data) {
        let url = server + resource + "update-periodo";
        return Axios.patch(url, data);
    },

    updateCorreo(data) {
        let url = server + resource + "update-correo";
        return Axios.patch(url, data);
    },
    updateCliente(data) {
        let url = server + resource + "update-client-name";
        return Axios.patch(url, data);
    },

    // 2022-10-14 | fg  | duplicado ??? linea 37
    cancelquote(cotId, userId) {
        let url = server + resource;
        return Axios.patch(url + cotId + "/" + userId + "/cancel");
    },



    updatecotizacioniva(data) {
        let url = server + resource + "update-iva";
        return Axios.patch(url, data);
    },

    confirmQuote(data) {
        let url = server + resource + "create-confirmation";
        return Axios.post(url, data);
    },

    updateCotizacionInclude(data) {
        let url = server + resource + "update-cotizacion-include";
        return Axios.patch(url, data);
    },

    updateReferenceCotizacion(data) {
        let url = server + resource + "update-cotizacion-referencia";
        return Axios.post(url, data);
    },
};
