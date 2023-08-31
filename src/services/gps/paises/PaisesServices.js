

import axios from 'axios'
import conf from '@/services/conf.js'


//const axios = require('axios')
const resource = '/api/paises'
const servergps = conf.servergps;

export default {

    getPaises() {
        let url = servergps + resource
        return axios.get(url)
    },


};
