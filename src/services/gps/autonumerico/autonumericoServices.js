import Axios from 'axios';
import Conf from '../../conf';
const resource = '/api/autonumerico/'
const server = Conf.servergps;

export default {

    /************************** STANDARS API ********************************/

    getSecuencialConfirmacion(data) {
        let url = server + resource + "get-secuencial-confirmacion";
        return Axios.post(url, data);
    },

   



};