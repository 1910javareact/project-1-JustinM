import { User } from "../models/user"
import { combineReducers } from "redux"
import { loginReducer } from "./login-reducer"
import { Reimbursement } from "../models/reimbursement"
import { reimburseReducer } from "./reimburse-reducer"

export interface ILoginState {
    user: User
}

export interface IReimburseState {
    reimburse: Reimbursement,
    allReimburse: [],
    userById: User,
    id: any,
    amount: any,
    submitted: any,
    resolved: any,
    description: any,
    resolver: any,
    status: any,
    type: any,
    success: string,
    showMenu: boolean
}

export interface IState {
    login:ILoginState,
    reimburse: IReimburseState
}

export const state = combineReducers<IState>({
    login:loginReducer,
    reimburse: reimburseReducer
})