import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/reconocimientos/'
const server = Conf.server;
const url = server + resource;

export default {

    /***********************************************************/

    urlPlaceImage: server + '/img/reconocimientos/',
    serverUrl: server,

    createReconocimiento(data) {
        let url = server + resource + 'create-reconocimiento';
        return Axios.post(url, data);
    },

    // getMisReconocimientos(data) {
    //     let url = server + resource + 'create-reconocimiento';
    //     return Axios.post(url, data);
    // },

    getMisReconocimientos(id) {
        let url = server + resource + 'get-mis-reconocimientos';
        return Axios.get(url + "/" + id);
    },

    getAllReconocimientosByUser() {
        let url = server + resource + 'get-all-reconocimientos-by-user';
        //return Axios.get(url + "/" + id);
         return Axios.get(url);
    },

    getAllReconocimientos() {
        let url = server + resource + 'get-all-reconocimientos';
        return Axios.get(url);
    },

    getNameImageFromCatalog() {
        let url = server + resource + 'get-name-image-from-catalog';
        return Axios.get(url);
    },
   updateReconocimientosSolicitudEstado(id, data) {
		let url = server + resource + "update-reconocimientos-estado-solicitud/";
		return Axios.put(url + id, data);
	},
    // import (data) {
    //     let url = server + resource + 'import';
    //     return Axios.post(url, data);
    // },

    // deleteRolesDePago(mes, anio) {
    //     let url = server + resource + 'delete-roles-pagos';
    //     return Axios.delete(url + "/" + mes + "/" + anio);
    // },

    // getRegisterFromRoles() {
    //     let url = server + resource + 'getRegisterFromRoles';
    //     return Axios.get(url);
    // },
    // validatedownloadRolPagos(mes, anio,id) {
    //     let url = server + resource + 'validatedownloadRolPagos';
    //     return Axios.get(url + "/" + mes + "/" + anio+ "/" + id);
    // },



};
