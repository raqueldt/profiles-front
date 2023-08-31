import Axios from "axios";
import Conf from "../../conf.js";
const axios = require("axios");
const resource = "/api/grupocotizaciones/";
const server = Conf.servergps;
const url = server + resource;

export default {
  /************************** STANDARS API ********************************/

  // 2021-09-15 | fg | referencias de un grupo
  getGrupoReferencias(gctId) {
    let url = server + resource
    return Axios.get(url + gctId + "/referencias")
  },

  updateStatus(id, data) {
    let url = server + resource + "updateStatus";
    return Axios.put(url + id, data);
  },

  getgrupocotizaciones(gctId) {
    let url = server + resource;
    return Axios.get(url + gctId + "/get-grupo-cotizaciones");
  },

  updateTitulo(data) {
    let url = server + resource + "update-titulo";
    return Axios.patch(url, data);
  },
  cancelgrupocotizaciones(gctId,userId) {
    let url = server + resource;
    return Axios.patch(url + gctId + "/" + userId+ "/cancel");
  },
};
