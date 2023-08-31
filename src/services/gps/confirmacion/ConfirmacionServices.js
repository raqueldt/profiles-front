import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/confirmacion/'
const server = Conf.servergps;


export default {

    search( params ){

        const url = server + resource + 'search'
        return Axios.get(url, { params })

    },

    InsertConfirmationsfromQuote(cofId, vendedor, codigo) {
        let url =
            server +
            resource +
            "InsertConfirmationsfromQuote" +
            "/" +
            cofId +
            "/" +
            vendedor +
            "/" +
            codigo;
        return Axios.get(url);
    },
    getDetailConfirmation(cofId) {
        let url = server + resource + "get-detail-confirmation" + "/" + cofId;
        return Axios.get(url);
    },
    updateReferenceConfirmacion(data) {
        let url = server + resource + "update-confirmacion-referencia";
        return Axios.post(url, data);
    },
    UpdatesDetailConfirmations(data) {
        let url = server + resource + "update-detail-confirmation";
        return Axios.post(url, data);
    },
    deleteservice(codfId) {
        let url = server + resource + "deleteservice";
        return Axios.get(url + "/" + codfId);
    },
    cancelService(codfId) {
        let url = server + resource + "cancel-service-confirmation";
        return Axios.get(url + "/" + codfId);
    },

    getCodesofClient(cotId) {
        let url = server + resource + "getCodesofClient";
        return Axios.get(url + "/" + cotId);
    },
    getNumberofCodesofClient(cotId) {
        let url = server + resource + "getNumberofCodesofClient";
        return Axios.get(url + "/" + cotId);
    },
    updateByOrden(data) {
        let url = server + resource + "updateByOrden";
        return Axios.post(url, data);
    },

    cancelar(data) {
        let url = server + resource + "cancelar";
        return Axios.patch(url, data);
    },

    getConfirmacionesHeaderInfo(cofId) {
        let url = server + resource + "getConfirmacionesHeaderInfo";
        return Axios.get(url + "/" + cofId);
    },
    getOperators() {
        let url = server + resource + "getOperators";
        return Axios.get(url);
    },
    asignOperatortoConfirmation(cofId, vendedor, operador) {
        let url =
            server +
            resource +
            "asignOperatortoConfirmation" +
            "/" +
            cofId +
            "/" +
            vendedor +
            "/" +
            operador;
        return Axios.get(url);
    },
    codigosCliente(cliId) {
        let url = server + resource;
        return Axios.get(url + cliId + "/codigos-cliente");
    },



    totalesConfirmacion(cofId) {

      const url = server + resource
      return Axios.get(url + cofId + "/totales")

    },

    updateConfirmacionIva(data) {
        let url = server + resource + "update-iva";
        return Axios.patch(url, data);
    },

    getGrupos(cofId) {
        let url = server + resource + "get-grupos-confirmacion";
        return Axios.get(url + "/" + cofId);
    },
    getInfoEditBooking(cofId) {
        let url = server + resource + "get-info-edit-booking";
        return Axios.get(url + "/" + cofId);
    },

    getMaxQuantitybyGroup(cofId,grupo) {
        let url = server + resource + "get-cantidad-grupos-confirmacion";
        return Axios.get(url + "/" + cofId+ "/" + grupo);
    },


    getConfirmationHeader(cofId) {
        let url = server + resource + "get-confirmacion-cabecera";
        return Axios.get(url + "/" + cofId);
    },

    updateConfirmacionIncludes(data) {
        let url = server + resource + "update-confirmacion-includes";
        return Axios.patch(url, data);
    },

    getInfoConfirmacion(cofId) {
        let url = server + resource + "get-info-confirmacion";
        return Axios.get(url + "/" + cofId);
    },
    updatePeriodo(data) {
        let url = server + resource + "update-periodo";
        return Axios.patch(url, data);
    },


    addConfirmacionDetalle(data) {
        let url = server + resource + "add-confirmacion-detalle";
        return Axios.post(url, data);
    },

    updateConfirmacionCabecera(data) {
        let url = server + resource + "update-confirmacion-cabecera";
        return Axios.post(url, data);
    },

    getCofIdByGctId(gctId) {
        let url = server + resource + "get-cofid-by-gctid";
        return Axios.get(url + "/" + gctId);
    },

    documentConfirmation(cofId) {
        let url = server + resource + cofId + "/document-confirmation";
        return Axios.get(url);
    },
    documentConfirmation(cofId) {
        let url = server + resource + cofId + "/document-confirmation";
        return Axios.get(url);
    },
    documentVouchers(cofId) {
        let url = server + resource + cofId + "/document-vouchers";
        return Axios.get(url);
    },
    downloadConfirmation(cofId) {
        let url = server + resource + "dowloand-confirmation" + "/" + cofId;
        return Axios.get(url);
    },
    downloadVouchers(cofId) {
        let url = server + resource + "dowloand-voucher" + "/" + cofId;
        return Axios.get(url);
    },
    sendConfirmation(cofId,correo, user, bokId) {
        let url = server + resource + 'sendConfirmation';
        return Axios.get(url + "/" + cofId + "/" + correo + "/" + user + "/" +bokId);
    },
    sendVoucher(cofId,correo, user, bokId) {
        let url = server + resource + 'sendVoucher';
        return Axios.get(url + "/" + cofId + "/" + correo + "/" + user + "/" +bokId);
    },
    generarConfVoucher(cofId, correo, user, bokId) {
        let url = server + resource + 'sendconfvoucher';
        return Axios.get(url + "/" + cofId + "/" + correo + "/" + user + "/" +bokId );
    },
    updateOrderArrayConfirmaciones( data) {
        let url = server + resource + 'update-order-array-confirmaciones';
        return Axios.post(url, data);
      },
      updateVentaConfirmaciones(bokId,  data) {
        let url = server + resource + 'update-venta-confirmacion/';
        return Axios.put(url + bokId, data);
      },      
};
