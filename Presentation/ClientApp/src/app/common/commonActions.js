import {APP_LOAD} from "../constants/actionTypes";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "./async";
import agent from "../../agent";

const appLoad = (payload,token) => ({type: APP_LOAD, payload, token});

export const appLoadAsync = (payload, token) => {
    return async (dispatch) => {
        try {
            dispatch(asyncActionStart());
            
        }
    }
}

// export const loginAsync = (creds, history) => {
//     console.log(history);
//     return async (dispatch) => {
//         try {
//             dispatch(asyncActionStart());
//             let res = await agent.Auth.login(creds.email, creds.password);
//             dispatch(login(res));
//             dispatch(asyncActionFinish());
//             history.push('/counter');
//         } catch (e) {
//             console.log(e);
//             dispatch(asyncActionError());
//         }
//     }
// };