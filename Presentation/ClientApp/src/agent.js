import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from "./app/common/commonStore";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'api';

// const encode = encodeURIComponent;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401){
        // logout
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set('Authorization', `Bearer ${commonStore.token}`);
    }
};

const requests = {
    del: url => 
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url => 
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
};

const Auth = {
    current: () => 
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (firstName, lastName, email, password) => 
        requests.post('/users/register', {user: {firstName, lastName, email, password}})
};

const Events = {
    all: () =>
        requests.get(`/events`),
    get: id => 
        requests.get(`/events/${id}`),
    create: event =>
        requests.post('/events', {event}),
    update: event =>
        requests.put(`/events/${event.id}`, {event})
};

export default {
    Auth,
    Events,
}