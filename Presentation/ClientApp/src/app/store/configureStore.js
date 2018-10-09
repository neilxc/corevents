import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import {localStorageMiddleware} from "./middleware";

export const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk, localStorageMiddleware))
    );
    
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }
    
    return store;
};