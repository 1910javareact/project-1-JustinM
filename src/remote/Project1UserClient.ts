import axios from 'axios'

export const userClient = axios.create({
    baseURL: 'http://localhost:1101',
    headers: {
        'Content-Types':'application/json'
    },
    withCredentials:true
})