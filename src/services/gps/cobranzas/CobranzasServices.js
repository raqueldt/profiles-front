import Axios from "axios";
import conf from '@/services/conf.js'
const axios = require('axios');
const resource = "/api/cobranzas";

const resource1 = "devoluciones";


const server = conf.servergps;

export default {

  serverDownloadNotaCreditoUrl: server + resource + '/download-nota-credito/',

  getCollectionFiles(params) {

    const url = server + resource + "/admin/files"
    return Axios.get(url, { params } )

  },


    /************************** STANDARS API ********************************/

    getDevoluciones(data, id) {
        let url = server + resource + "/" + id + "/" + resource1;
        return axios.get(url, data);
    },

    getPaymentRecords() {
        let url = server + resource + "get-lates-record";
        return Axios.get(url);
    },

    getCobranzas(queryParams) {
        let url = server + resource;
        return axios.get(url, queryParams);
    },
    detailNC(devId) {
        let url = server + resource ;
        return Axios.get(url + "/" + devId+ "/detail-nc");
    },


    createCobranza(data) {
        let url = server + resource;
        return Axios.post(url, data);
    },
    updateCobranza(data, id) {
        let url = server + resource + "/" + id;
        return axios.patch(url, data);
    },

    getConfirmacionPlanPagos(cofId) {
        let url = server + resource + "/get-confirmacion-plan-pagos";
        return Axios.get(url + "/" + cofId);
    },

    deleteCobranza(data, id) {
        let url = server + resource + "/" + id;
        return axios.delete(url, { data });
    },

    getLatestPayments(flag) {
        let url="";
        if (flag) url = server + resource + "/latest-payments/" + flag; 
        else url = server + resource + "/latest-payments";
        return Axios.get(url);
    },
    
    getPaymentsDue(flag) {
        let url="";
        if (flag) url = server + resource + "/payments-due/" + flag; 
        else url = server + resource + "/payments-due";
        return Axios.get(url);
    },

    getOverduePayments(flag) {
        let url="";
        if (flag) url = server + resource + "/overdue-payments/" + flag; 
        else url = server + resource + "/overdue-payments";
        return Axios.get(url);
    },

    getUrgentPayments(flag) {
        let url="";
        if (flag) url = server + resource + "/urgent-payments/" + flag; 
        else url = server + resource + "/urgent-payments";
        return Axios.get(url);
    },

    getCuentasBancarias() {
        let url = server + resource + "/cuentas-bancarias";
        return Axios.get(url);
    },

    //   **************************** ADMINISTRADOR ****************************
    getFiles(params) {

        const url = server + resource + "/admin/files"
        return Axios.get(url, params )

    },

    getFilesByYear(data) {
        let url = server + resource + "/admin/files-year";
        return Axios.get(url, data);
        //return Axios.get(url);
    },
    getClientResume(data) {
        let url = server + resource + "/admin/client-resume";
        return Axios.get(url, data);
        //return Axios.get(url);
    },
    getBalance(data) {
        let url = server + resource + "/admin/balance";
        return Axios.get(url, data);
        //return Axios.get(url);
    },

    //   **************************** NOTAS DE CREDITO PDF ****************************

    downloadNotaCredito(devId) {
        let url = server + resource + "/download-nota-credito";
        return Axios.get(url + "/" + devId);
    },

    getNotasCredito() {
        let url = server + resource + "/get-notas-credito";
        return Axios.get(url);
    },    

};
