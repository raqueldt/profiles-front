import Axios from "axios";
// import apiToken from "@ /services/apiToken.js";

import Conf from "../../conf.js";
const resource = "/api/newinterno/";
const server = Conf.server;

export default {
  /************************** STANDARS API ********************************/

  prueba() {
    let url = server + resource + "prueba";
    return Axios.get(url);
  },
  show(params) {
    console.log("paaa", params);
    let url = server + resource + "perfilUser";

    return Axios.get(url, { params });
  }
};
