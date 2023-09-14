import Axios from 'axios';
import Conf from "../../conf.js";
const axios = require('axios');
const resource = '/api/anotaciones/'
const server = Conf.server;
const url = server + resource;

export default {

    /************************** STANDARS API ********************************/

    // getAll() {
    //     console.log("entre a getAll");
    //     console.log(url);
    //     console.log(Axios.get(url));
    //     //return Axios.get(url);
    // },

    get(id) {
        //return Axios.get('url/${id}');
        //return Axios.get(url + '/' + id);
        return Axios.get(url + id);
    },

    create(data) {
        return Axios.post(url, data);
    },

    update(id, data) {
        //return Axios.put('url/${id}', data);
        return Axios.put(url + '/' + id, data);
    },

    delete(id) {
        return Axios.delete(url + '/' + id);
    },


    /***********************************************************/

    getEmpresas() {
        let url = server + resource + 'getEmpresas';
        return Axios.get(url);
    },

    createTask(data) {
        let url = server + resource + 'createTask';
        return Axios.post(url, data);
    },


    getAllByUser(id) {
        let url = server + resource + 'getAllByUser';
        return Axios.get(url + '/' + id);
    },

    getAllByAuthor(id) {
        let url = server + resource + 'getAllByAuthor';
        return Axios.get(url + '/' + id);
    },

    getAllByWorkgroup(id) {
        //return id;
        let url = server + resource + 'getAllByWorkgroup';
        //console.log(url);
        return Axios.get(url + '/' + id);
    },

    getEventById(id) {
        let url = server + resource + 'getEventById';
        return Axios.get(url + '/' + id);
    },

    updateEventById(id, data) {
        let url = server + resource + 'updateEventById/';
        return Axios.put(url + id, data);
    },

    newTask(data) {
        return Axios.post(url, data);
    },

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAll';
        return Axios.get(url);
    },
    getAllTipoAnotaciones() {
        let url = server + resource + 'getAllTipoAnotaciones';
        return Axios.get(url);
    },
    getAllToDo(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllToDo';
        //return Axios.get(url);
        return Axios.get(url + '/' + id);
    },

    getAllToDoByWorkgroup(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllToDoByWorkgroup';
        //return Axios.get(url);
        return Axios.get(url + '/' + id);
    },
    getAllOnlyActivities(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'getAllOnlyActivities';
        //return Axios.get(url);
        return Axios.get(url + '/' + id);
    },

    daysLate(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'daysLate';
        return Axios.get(url + '/' + id);
    },

    companyDaysLate(id) {
        //console.log(Axios.get(url));
        let url = server + resource + 'companyDaysLate';
        return Axios.get(url + '/' + id);
    },

    deleteAll(data) {
        let url = server + resource + 'deleteAll';
        return Axios.post(url, data);
    },

};