import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/profiles/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    // 2021-12-10 | fg | lista de cliente
    getClientes () {
        const url = server + resource + 'clientes';
        return Axios.get(url);
    },

    getComisionGPS() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getComisionGPS';
        return Axios.get(url);
    },
    getPaisesGPS() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getPaisesGPS';
        return Axios.get(url);
    },
    getClientInfo(cliid){
        let url = server + resource + 'getClientInfo';
        return Axios.get(url + "/" + cliid);
    },
    getNumClientByCountry(pais){
        let url = server + resource + 'getNumClientByCountry';
        return Axios.get(url + "/" + pais);
    },

};
