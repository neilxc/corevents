import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../app/common/async";
import {LOGIN} from "../../app/constants/actionTypes";
import agent from "../../agent";

const login = user => ({type: LOGIN, payload: user});

export const loginAsync = (creds, history) => {
    console.log(history);
    return async (dispatch) => {
        try {
            dispatch(asyncActionStart());
            let res = await agent.Auth.login(creds.email, creds.password);
            dispatch(login(res));
            dispatch(asyncActionFinish());
            history.push('/counter');
        } catch (e) {
            console.log(e);
            dispatch(asyncActionError());
        }
    }
};