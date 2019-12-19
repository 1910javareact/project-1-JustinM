import { Reimbursement } from "../models/reimbursement";
import { IReimburseState } from ".";
import { rUpdateTypes } from "../action-mappers/reim-update-action-mapper";
import { User } from "../models/user";
import { Role } from "../models/role";


const initialState: IReimburseState = {
    reimburse: new Reimbursement(0, 0, 0, 0, 0, '', 0, 0, 0),
    allReimburse: [],
    userById: new User(0, '', '', '', '', '', new Role(0, '')),
    id: null,
    amount: null,
    submitted: null,
    resolved: null,
    description: null,
    resolver: null,
    status: null,
    type: null,
    success: '',
    showMenu: false
}

export const reimburseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case rUpdateTypes.FOUND: {
            return {
                ...state,
                allReimburse: action.payload.user
            }
        }
        default:
            return state
    }
}