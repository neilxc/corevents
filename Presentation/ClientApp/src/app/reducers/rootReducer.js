import {combineReducers} from "redux";
import { reducer as FormReducer } from 'redux-form';
import counterReducer from "../../features/counter/counterReducer";
import authReducer from "../../features/auth/authReducer";
import commonReducer from "../common/commonReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    form: FormReducer,
    auth: authReducer,
    common: commonReducer
});

export default rootReducer