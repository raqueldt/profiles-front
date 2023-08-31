import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/confirmacionesSummary/'
const server = Conf.servergps;

export default {

    //Informacion de Detalle de Confirmación en Summary
    getConfirmacionesInfoSummary(cofId) {
        let url = server + resource + 'get-confirmaciones-info-summary';
        return Axios.get(url + "/" + cofId);
    },

    //Add Notas:
    getConfirmacionesInfoNotas(cofId) {
        let url = server + resource + 'get-confirmaciones-info-notas';
        return Axios.get(url + "/" + cofId);
    },

    // Politícias de Cancelación por Id de cliente:
    getPoliticasCancelaciones(clientId) {
        let url = server + resource + 'get-politicas-cancelaciones';
        return Axios.get(url + "/" + clientId);
        //return Axios.get(url);
    },

    updateConfirmationCancelation(id, data) {
        //let url = server + resource + 'updateConfirmationCancelation/';
        let url = server + resource + 'update-confirmacion-cancelaciones/';
        return Axios.put(url + id, data);
    },


    addConfirmationCancelacion(data) {
        let url = server + resource + 'add-confirmation-cancelation';
        return Axios.post(url, data);
    },

    addConfirmacionesInfoNotas(data) {
        let url = server + resource + 'add-confirmaciones-info-notas';
        return Axios.post(url, data);
    },

    delConfirmacionesInfoNotas(cfnId) {
        let url = server + resource + 'del-confirmaciones-info-notas';
        return Axios.delete(url + "/" + cfnId);
    },

    getConfirmacionCancelaciones(cofId, cliId) {
        let url = server + resource + 'get-confirmacion-cancelaciones';
        return Axios.get(url + "/" + cofId + "/" + cliId);
    },

};