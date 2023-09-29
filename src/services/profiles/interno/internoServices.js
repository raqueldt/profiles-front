import Axios from "axios";
// import apiToken from "@/services/apiToken.js";
import Conf from "../../conf.js";
const resource = "/api/newinterno/";
const server = Conf.server;

export default {
  create(data) {
    console.log("neww", data);
    let url = server + resource + "createUser";
    return Axios.post(url, data);
  },
  getAllUsers() {
    let url = server + resource + "getAllUsers";
    return Axios.get(url);
  },
  updateStatus(id) {
    let url = server + resource + "updateStatus/";
    return Axios.put(url + id);
  },
};
