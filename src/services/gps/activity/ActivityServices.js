import Axios from 'axios';
import Conf from '../../conf';
const axios = require('axios');
const resource = '/api/activity/'
const server = Conf.servergps;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    /**/
    getAllActivities() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllActivities';
        return Axios.get(url);
    },

    getAllBySchId(schId) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllBySchId';
        return Axios.get(url + "/" + schId);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

    addActivity(data) {
        let url = server + resource + "addActivity";
        return Axios.post(url, data);
    },

    deleteActivity(id) {
        let url = server + resource + "deleteActivity";
        return Axios.delete(url + "/" + id);
    },
    getActvityBySch(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getActvityBySch/';
        return Axios.get(url + id);
    },
    getActivitynotinSch(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getActivitynotinSch/';
        return Axios.get(url + id);
    },



};
