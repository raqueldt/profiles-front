import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/metadata/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/


    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'metadataAll';
        return Axios.get(url);
    },

    deleteAllMeta(data) {
        let url = server + resource + 'deleteAllMeta';
        return Axios.post(url, data);
    },

    updateByOrden(data) {
        let url = server + resource + "updateByOrden";
        return Axios.post(url, data);
    },

  /*  getItinerariesType() {
        let url = server + resource + 'getItinerariesType';
        return Axios.get(url);
    },
    getItinerariesActi() {
        let url = server + resource + 'getItinerariesActi';
        return Axios.get(url);
    },*/

    //FS 15/07/2020
    //Trae los grupos por ID
    getByGroup(met_grupo) {
        let url = server + resource + 'getByGroup'+'/'+ met_grupo;
        return Axios.get(url);
    },

    
    getMetadataByGroup(met_grupo) {
        let url = server + resource + 'getMetadataByGroup'+'/'+ met_grupo;
        return Axios.get(url);
    },
   
};
