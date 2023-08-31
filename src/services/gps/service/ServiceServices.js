import Axios from 'axios';
import Conf from '../conf.js';
const resource = '/api/service/'
const server = Conf.server;

export default {

    /************************** STANDARS API ********************************/

    getAll() {
        let url = server + resource + 'get-services';
        return Axios.get(url);
    },

    deleteService(id) {
        let url = server + resource + 'delete-service';
        return Axios.post(url+ '/' + id);
    },

    getServicesMetadata() {
        let url = server + resource + 'get-services-metadata';
        return Axios.get(url);
    },

    getConditionalMetadata() {
        let url = server + resource + 'get-conditional-metadata';
        return Axios.get(url);
    },

    getVesselServices(vslId) {
        let url = server + resource + 'get-vessel-services';
        return Axios.get(url+ '/' + vslId);
    },
};