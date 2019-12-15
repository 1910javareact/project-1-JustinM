import axios from 'axios'

export const userClient = axios.create({
    baseURL: 'http://localhost:1101',
    headers: {
        'Content-Type':'application/json'
    },
    withCredentials:true
})