import axios from 'axios'
import conf from '@/services/conf.js'


const resource = '/api/cobranzas/file-manager'
const servergps = conf.servergps;

export default {

    getFileManager(params) {
        
        const url = servergps + resource         
        return axios.get(url, params)
    },    

    getFileSummary(id) {
        
        const url = servergps + resource + '/' + id + '/summary'
        
        return axios.get(url)
    },


/*
    storeCreditNote(data) {
        const url = servergps + resource
        return axios.post(url, data)

    },

    updateCreditNote(data, id) {        

        let url = servergps + resource + '/' + id
        return axios.patch(url, data)
    },    
  */  

};