import Axios from "axios";
import Conf from "../../conf.js";
const axios = require("axios");
const resource = "/api/empresa/";
const server = Conf.server;
const url = server + resource;

export default {
  /************************** STANDARS API ********************************/

  getAll() {
    let url = server + resource + "getAll";
    return Axios.get(url);
  },

  get(id) {
    //return Axios.get('url/${id}');
    return Axios.get(url + "/" + id);
  },

  create(data) {
    return Axios.post(url, data);
  },
  createCompany(data) {
    console.log("neww", data);
    let url = server + resource + "createCompany";
    return Axios.post(url, data);
  },

  update(id, data) {
    //return Axios.put('url/${id}', data);
    return Axios.put(url + "/" + id, data);
  },

  delete(id) {
    return Axios.delete(url + "/" + id);
  },

  /***********************************************************/

  deleteAll(data) {
    let url = server + resource + "deleteAll";
    return Axios.post(url, data);
  },

  getUsersByStatusAdmin() {
    let url = server + resource + "getUsersByStatusAdmin";
    return Axios.get(url);
  },
  getUsersByStatus(id) {
    let url = server + resource + "getUsersByStatus";
    return Axios.get(url + "/" + id);
  },

  getUsersByCountryAdmin() {
    let url = server + resource + "getUsersByCountryAdmin";
    return Axios.get(url);
  },
  getUsersByCountry(id) {
    let url = server + resource + "getUsersByCountry";
    return Axios.get(url + "/" + id);
  },

  getAllLandOperators() {
    let url = server + resource + "getAllLandOperators";
    return Axios.get(url);
  },

  updateMasiveMails(data) {
    let url = server + resource + "updateMasiveMails";
    return Axios.post(url, data);
  },
};
