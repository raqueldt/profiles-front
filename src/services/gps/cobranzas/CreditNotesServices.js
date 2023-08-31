import axios from 'axios'
import conf from '@/services/conf.js'


const resource = '/api/devoluciones'
const servergps = conf.servergps;

export default {

    getCreditNotes(queryParams) {
        let url = servergps + resource
        return axios.get(url, queryParams)
    },

    storeCreditNote(data) {
        
        const url = servergps + resource
        return axios.post(url, data)

    },

    updateCreditNote(data, id) {        

        let url = servergps + resource + '/' + id
        return axios.patch(url, data)
    },    
    

    deleteCreditNote( id ) {
        
        let url = servergps + resource + '/' + id
        return axios.delete(url )

    },
    


};