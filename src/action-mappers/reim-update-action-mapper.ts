import { postReimAPI, findReimByStatusAPI, findReimByUserAPI, updateReimburseAPI } from "../remote/project1-clients/Project1Reim"

export const rUpdateTypes = {
    SUCCESSFUL_POST: 'REIMBURSEMENT_POST_SUCESSFUL_POST',
    UNSUCCESSFUL_POST: 'REIMBURSEMENT_POST_UNSUCCESSFUL_POST',
    SUCCESSFUL_UPDATE: 'REIMBURSEMENT_UPDATE_SUCCESSFUL_UPDATE',
    UNSUCCESSFUL_UPDATE: 'REIMBURSEMENT_UPDATE_FAILED_UPDATE',
    FOUND_STATUS: 'REIMBURSEMENT_STATUS_FIND_SUCCESSFUL',
    FOUND_USER: 'REIMBURSEMENT_USER_FIND_SUCCESSFUL',
    NOT_FOUND: 'REIMBURSEMENT_FIND_UNSUCCESSFUL'
}

export const rPost = (id: number, author: number, amount: number, submitted: string, resolved: string, description: string, resolver: number, status: number, type: number) => async (dispatch: any) => {
    try {
        let res = await postReimAPI(id, author, amount, submitted, resolved, description, resolver, status, type)
        if(res.status === 201) {
            dispatch({
                type: rUpdateTypes.SUCCESSFUL_POST,
                payload: {
                    user: res.body
                }
            })
        } else {
            dispatch({
                type: rUpdateTypes.UNSUCCESSFUL_POST
            })
        }
    } catch (e) {
        dispatch({
            type: rUpdateTypes.UNSUCCESSFUL_POST
        })
    }
}

export const rFindByStatus = (status: number) => async (dispatch: any) => {
    try {
        let res = await findReimByStatusAPI(status)
        if(res.status === 200) {
            dispatch({
                type: rUpdateTypes.FOUND_STATUS,
                payload: {
                    reimbursement: res.body
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

export const rFindByUser = (user: number) => async (dispatch: any) => {
    try {
        let res = await findReimByUserAPI(user)
        if(res.status === 200) {
            dispatch({
                type: rUpdateTypes.FOUND_USER,
                payload: {
                    reimbursement: res.body
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

export const rUpdateReimburse = (id: number, resolved: string, resolver: number, status: number) => async (dispatch: any) => {
    try {
        let res = await updateReimburseAPI(id, resolved, resolver, status)
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