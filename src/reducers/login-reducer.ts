import { User } from "../models/user";
import { Role } from "../models/role";
import { ILoginState } from ".";
import { uLoginTypes } from "../action-mappers/login-action-mapper";

const initialState: ILoginState = {
    user: new User(0, '', '', '', '', '', new Role(0, ''))
}

export const loginReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case uLoginTypes.SUCCESSFUL_LOGIN:{
            return {
                ...state,
                user:action.payload.user
            }
        }
        default:
            return state
    }
}