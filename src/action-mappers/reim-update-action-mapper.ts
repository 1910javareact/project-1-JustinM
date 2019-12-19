import { updateReimAPI, findReimByStatusAPI } from "../remote/project1-clients/Project1Reim"

export const rUpdateTypes = {
    SUCCESSFUL_UPDATE: 'REIMBURSEMENT_UPDATE_SUCCESSFUL_UPDATE',
    UNSUCCESSFUL_UPDATE: 'REIMBURSEMENT_UPDATE_FAILED_UPDATE',
    FOUND: 'REIMBURSEMENT_FIND_SUCCESSFUL',
    NOT_FOUND: 'REIMBURSEMENT_FIND_UNSUCCESSFUL'
}

export const rUpdate = (id: number, author: number, amount: number, submitted: string, resolved: string, description: string, resolver: number, status: number, type: number) => async (dispatch: any) => {
    try {
        let res = await updateReimAPI(id, author, amount, submitted, resolved, description, resolver, status, type)
        if(res.status === 201) {
            dispatch({
                type: rUpdateTypes.SUCCESSFUL_UPDATE,
                payload: {
                    user: res.body
                }
            })
        } else {
            dispatch({
                type: rUpdateTypes.UNSUCCESSFUL_UPDATE
            })
        }
    } catch (e) {
        dispatch({
            type: rUpdateTypes.UNSUCCESSFUL_UPDATE
        })
    }
}

export const rFindByStatus = (status: number) => async (dispatch: any) => {
    try {
        let res = await findReimByStatusAPI(status)
        if(res.status === 200) {
            dispatch({
                type: rUpdateTypes.FOUND,
                payload: {
                    user: res.body
                }
            })
        } else {
            dispatch({
                type: rUpdateTypes.NOT_FOUND
            })
        }
    } catch (e) {
        dispatch({
            type: rUpdateTypes.NOT_FOUND
        })
    }
}