import axios from 'axios'
import { environment } from '../environment'

export const userClient = axios.create({
    withCredentials:true,
    baseURL: environment.baseUrl,
    headers: {
        'Content-Type':'application/json'
    }
})