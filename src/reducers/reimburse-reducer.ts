import { Reimbursement } from "../models/reimbursement";
import { IReimburseState } from ".";
import { rUpdateTypes } from "../action-mappers/reim-update-action-mapper";
import { User } from "../models/user";
import { Role } from "../models/role";


const initialState: IReimburseState = {
    reimburse: new Reimbursement(0, 0, 0, '', '', '', 0, 0, 0),
    allReimburse: [],
    allReimburseUser: [],
    userById: new User(0, '', '', '', '', '', new Role(0, '')),
    id: null,
    amount: null,
    submitted: null,
    resolved: null,
    description: null,
    resolver: null,
    status: null,
    type: null,
    rById: null,
    success: '',
    showMenu: false,
    showMenuType: false
}

export const reimburseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case rUpdateTypes.FOUND_STATUS: {
            return {
                ...state,
                allReimburse: action.payload.reimbursement
            }
        }
        case rUpdateTypes.FOUND_USER: {
            return {
                ...state,
                allReimburseUser: action.payload.reimbursement
            }
        }
        default:
            return state
    }
}