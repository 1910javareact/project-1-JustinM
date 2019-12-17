import { updateUserAPI } from "../remote/project1-clients/Project1User"

export const uUpdateTypes = {
    SUCCESSFUL_UPDATE: 'USER_UPDATE_SUCCESSFUL_UPDATE',
    UNSUCCESSFUL_UPDATE: 'USER_UPDATE_FAILED_UPDATE'
}

export const uUpdate = (id: number, uname: string, fname: string, lname: string, email: string) => async (dispatch: any) => {
    try {
        let res = await updateUserAPI(id, uname, fname, lname, email)
        if(res.status === 201) {
            dispatch({
                type: uUpdateTypes.SUCCESSFUL_UPDATE,
                payload: {
                    user: res.body
                }
            })
        } else {
            dispatch({
                type: uUpdateTypes.UNSUCCESSFUL_UPDATE
            })
        }
    } catch (e) {
        dispatch({
            type: uUpdateTypes.UNSUCCESSFUL_UPDATE
        })
    }
}