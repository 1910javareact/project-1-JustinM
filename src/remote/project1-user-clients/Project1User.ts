import { userClient } from "./Project1Client"

export async function userLogin(username: string, password: string) {
    const credentials = {
        username,
        password
    }
    try {
        const response = await userClient.post('/login', credentials)
        if(response.status === 200) {
            return {
                status: response.status,
                body: response.data
            }
        } else {
            return {
                status: response.status,
                body: undefined
            }
        }
    } catch (e) {
        console.log(e);
        throw new Error('Something went wrong')
    }
}

export const getUserById = async (id: number) => {
    try {
        const response = await userClient.get('/user', { params: { id }})
        if(response.status === 200) {
            return {
                status: response.status,
                body: response.data
            }
        } else {
            return {
                status: response.status,
                body: undefined
            }
        }
    } catch (e) {
        console.log(e);
        throw new Error ('Something went wrong')
    }
}

export const getAllUsersAPI = async () => {
    try {
        const response = await userClient.get('/user')
        if(response.status === 200) {
            return {
                status: response.status,
                body: response.data
            }
        } else {
            return {
                status: response.status,
                body: undefined
            }
        }
    } catch(e) {
        console.log(e);
        throw new Error('Something went wrong')
    }
}