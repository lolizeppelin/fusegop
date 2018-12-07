import request from '../http';

import {urlPrepare, PRIVATE} from '../config';

function showUser(uid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users', { uid });
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}


function indexUsers(token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users');
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => {
            console.log(error);
            failCallback(error);
        });
}


function showUserOwns(uid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users', { uid, ext: 'owns' });
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}

function getUserPays(uid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users', { uid, ext: 'paylogs' });
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}


function getUserOrders(uid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users', { uid, ext: 'orders' });
    return request(url, 'GET', token, null, null, false, 5000, true)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}



function getUserRechargeLogs(uid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'users', { uid, ext: 'recharges' });
    return request(url, 'GET', token, null, null, false, 5000, true)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}



export {
    showUser,
    indexUsers,
    showUserOwns,
    getUserPays,
    getUserOrders,
    getUserRechargeLogs,
}