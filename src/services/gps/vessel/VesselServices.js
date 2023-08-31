import Axios from 'axios';
import Conf from '../../conf.js';
const axios = require('axios');
const resource = '/api/vessel/'
const server = Conf.servergps;
const url = server + resource;


export default {

    //25/09/2020:fs cargar datos del vessel para editar
    getVesselId(idVessel){

        let url = server + resource + 'get-vessel-id' +'/' + idVessel;
        console.log(url);
        return Axios.get(url);

    },

    //18-09-2020:fg: guardar vessel con informaciòn bàsica
    addVessel(data){

        let url = server + resource + 'add-vessel';
        console.log(url);
        return Axios.post(url,data);

    },


    //fg:04-08-2020:info vessel más adicionales
    getVesselInfo(idVessel){

        let url = server + resource + 'get-vessel-info' +'/' + idVessel;
        return Axios.get(url);

    },

    //fg:04-08-2020:lista de botes incluye conteo de itinerarios existentes

    getInformationAllVessel(idVessel){

        let url = server + resource + 'getInformationAllVessel' +'/' + idVessel;
        return Axios.get(url);

    },
    getListCountItineraries(){

        let url = server + resource + 'get-list-count-itineraries';
        return Axios.get(url);

    },

    /************************** STANDARS API ********************************/

    //27-07-2020 fg lista simple de botes activos por orden alfabetico
    getList(){

        let url = server + resource + 'getList';
        return Axios.get(url);

    },

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    // getServicesMetadata() {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getServicesMetadata';
    //     return Axios.get(url);
    // },

    // getConditionalMetadata() {
    //     //console.log(Axios.get(url));
    //     let url = server + resource + 'getConditionalMetadata';
    //     return Axios.get(url);
    // },

};
