import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/app-settings/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    /**/
    getAllSettings() {
        //console.log(Axios.get(url));
        let url = server + resource + 'get-all-settings';
        return Axios.get(url);
    },

    getSettingsByName(name) {
        let url = server + resource +  'get-settings-by-name';
        return Axios.get(url + "/" + name);
    },    

    // updateSettings(data) {
    //     let url = server + resource + 'update-settings';
    //     return Axios.put(url, data);
    // },

    updateSettings(id, data) {
        let url = server + resource + "update-settings/";
        return Axios.put(url + id, data);
    },


};
