import 'semantic-ui-css/semantic.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from "./app/layout/App";
import {Provider} from "mobx-react";
import authStore from "./features/auth/authStore";
import commonStore from "./app/common/commonStore";
import userStore from "./features/users/userStore";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const stores = {
    authStore,
    commonStore,
    userStore
};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </Provider>,
  rootElement);

registerServiceWorker();
