import request from '../http';

import {urlPrepare, PRIVATE } from '../config';

function showLog(id, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'logs', { id });
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}


function indexLogs(token, post, limit, timeline,
                   successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'logs');
    return request(url, 'GET', token, { post, limit, timeline })
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => {
            failCallback(error);
        });
}


export {
    showLog,
    indexLogs
}