import Axios from "axios";
import conf from "@/services/conf.js";
const resource = "/api/cobranzas/";
const server = conf.servergps;

export default {
    /************************** STANDARS API ********************************/

    getConfirmacionPlanPagos(id) {
        let url = server + resource + "get-confirmacion-plan-pagos/";
        return Axios.get(url + id);
    },

    // updatePlanPagos(id, data) {
    //     let url = server + resource + "update-plan-pagos/";
    //     return Axios.put(url + id, data);
    // },

    updateMasivePlanPagos(data) {
        let url = server + resource + "update-masive-plan-pagos";
        return Axios.post(url, data);
    },
};