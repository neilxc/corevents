import {createReducer} from "../../app/common/reducerUtil";
import {LOGIN} from "../../app/constants/actionTypes";

const initialState = {
    currentUser: {}
};

const loginUser = (state, payload) => {
    return {
        ...state,
        isLoggedIn: true,
        currentUser: payload.user
    }
};

export default createReducer(initialState, {
    [LOGIN]: loginUser,
})