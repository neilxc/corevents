import {APP_LOAD} from "../constants/actionTypes";
import {createReducer} from "./reducerUtil";

const initialState = {
    appName: 'CoreVents',
    token: null
};

const appLoad = (state, payload) => {
    return {
        ...state,
        token: payload ? payload.user.token : null,
        appLoaded: true,
        currentUser: payload ? payload.user : null
    }
};

export default createReducer(initialState, {
    [APP_LOAD]: appLoad
})