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
  updateUser(data) {
    let url = server + resource + "updateUser";
    return Axios.patch(url, data);
  },
  show(params) {
    console.log("paaa", params);
    let url = server + resource + "dataUser";
    return Axios.get(url, { params });
  },
};
