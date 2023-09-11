import Axios from "axios";
// import apiToken from "@ /services/apiToken.js";

import Conf from "../../conf.js";
const resource = "/api/catalogos/";
const server = Conf.server;

export default {
  /************************** STANDARS API ********************************/

  getCatalogosByCodigo(id) {
    console.log("llama api", id);
    let url = server + resource + "getCatalogosByCodigo";
    return Axios.get(url + "/" + id);
  }
};
