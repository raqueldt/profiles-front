

import axios from 'axios'

const apiToken = axios.create({
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
})


export default apiToken
