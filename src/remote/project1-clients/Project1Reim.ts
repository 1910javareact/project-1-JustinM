import { userClient } from "./Project1Client";

export async function updateReimAPI(reimbursement_id: number, author: number, amount: number, date_submitted: number, date_resolved: number, description: string, resolver: number, status: number, type: number) {
    const update = {
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