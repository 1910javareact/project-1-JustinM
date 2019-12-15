import { compose, applyMiddleware, createStore, Store } from "redux"
import logger from "redux-logger"
import { state } from "./reducers"
import reduxThunk from "redux-thunk"

const a:any = window

const composeEnhancers = a.__REDUX_DEVOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, logger)
)

export const store: Store<any> = createStore(
    state,
    enhancer
)