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
  getAllUsersActive() {
    let url = server + resource + "getAllUsersActive";
    return Axios.get(url);
  },
  getAllUsersPassive() {
    let url = server + resource + "getAllUsersPassive";
    return Axios.get(url);
  },
};
