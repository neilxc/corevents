import {LOGIN, LOGOUT, REGISTER} from "../constants/actionTypes";
import agent from "../../agent";

export const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error) {
            console.log(action);
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.removeItem('jwt');
        agent.setToken(null)
    }
    
    next(action);
};