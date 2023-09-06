import Axios from "axios";
import apiToken from "@/services/apiToken.js";

import Conf from "../conf.js";
const resource = "/api/";
const servergps = Conf.servergps;

export default {

  prueba() {
    let url = servergps + resource + "prueba";
    return Axios.get(url);
  },
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
    let url = servergps + resource + "logout";
    return Axios.post(url);
  },

  authenticatedUser() {
    const url = servergps + resource + "authenticated-user";
    return apiToken.post(url);
  }
};
