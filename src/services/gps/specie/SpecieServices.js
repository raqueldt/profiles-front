import Axios from 'axios';
import Conf from '../../conf';
const resource = '/api/specie/'
const server = Conf.servergps;

export default {

    getAll() {
        //console.log(Axios.get(url));
        let url = server + resource + 'get-species';
        return Axios.get(url);
    },

    getTypeSpecies() {
        let url = server + resource + 'get-type-species';
        return Axios.get(url);
    },
    deleteSpecie(id) {
        let url = server + resource + 'delete-specie';
        return Axios.post(url+ '/' + id);
    },

};
