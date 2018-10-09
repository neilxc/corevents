import {createReducer} from "./reducerUtil";

export const ASYNC_ACTION_START = "ASYNC_ACTION_START";
export const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
export const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";

export const asyncActionStart = () => {
    return {
        type: ASYNC_ACTION_START
    }
};

export const asyncActionFinish = () => {
    return {
        type: ASYNC_ACTION_FINISH
    }
};

export const asyncActionError = () => {
    return {
        type: ASYNC_ACTION_ERROR
    }
};

const initialState = {
    loading: false
};

const started = (state) => {
    return {...state, loading: true}
};

const finished = (state) => {
    return {...state, loading: false}
};

const error = (state) => {
    return {...state, loading: false}
};

export default createReducer(initialState, {
    [ASYNC_ACTION_START]: started,
    [ASYNC_ACTION_FINISH]: finished,
    [ASYNC_ACTION_ERROR]: error
})