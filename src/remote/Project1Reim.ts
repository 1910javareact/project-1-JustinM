import { userClient } from "./Project1Client";

export async function postReimAPI(reimbursement_id: number, author: number, amount: number, date_submitted: string, date_resolved: string, description: string, resolver: any, status: number, type: number) {
    amount = Number(amount);
    type = Number(type);
    const post = {
        reimbursement_id,
        author,
        amount,
        date_submitted,
        date_resolved,
        description,
        resolver,
        status,
        type
    }
    try {
        const response = await userClient.post('/reimbursement', post)
        if (response.status === 201) {
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

export async function findReimByStatusAPI(id: number) {
    try {
        const response = await userClient.get('/reimbursement/status/' + id)
        if (response.status === 200) {
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

export async function findReimByUserAPI(id: number) {
    try {
        const response = await userClient.get('/reimbursement/author/userId/' + id)
        if (response.status === 200) {
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

export async function updateReimburseAPI(reimbursement_id: number, date_resolved: string, resolver: number, status: number) {
    reimbursement_id = Number(reimbursement_id);
    status = Number(status);
    const update = {
        reimbursement_id,
        author: undefined,
        amount: undefined,
        date_submitted: undefined,
        date_resolved,
        description: undefined,
        resolver,
        status,
        type: undefined
    }
    try {
        const response = await userClient.patch('/reimbursement', update)
        if (response.status === 201) {
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