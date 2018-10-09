import {createReducer} from "../../app/common/reducerUtil";
import {DECREMENT_COUNTER, INCREMENT_COUNTER} from "../../app/constants/actionTypes";

const initialState = {
    data: 42
};

const incrementCounter = (state) => {
    return {...state, data: state.data + 1}
};

const decrementCounter = state => {
    return {...state, data: state.data - 1}
};

export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter
})