import Axios from 'axios';
import apiToken from '@/services/apiToken.js'



import Conf from '../conf.js';
const resource = '/api/'
const server = Conf.server;
const servergps = Conf.servergps;

export default {

    /************************** STANDARS API ********************************/

    login(data) {
        let url = servergps + resource + "login";
        return Axios.post(url, data);
    },

    userinfo(data) {
      console.log("userinfo data", data);
        let url = servergps + resource + "userinfo";
        return Axios.post(url, data);
    },

    logout() {
        let url = servergps + resource + 'logout';
        return Axios.post(url);
    },

    //2023-03-02 | fg | recuperar info de usuario autenticado
    authenticatedUser() {
      const url = servergps + resource + "authenticated-user";
      return apiToken.post(url);
    }

};
