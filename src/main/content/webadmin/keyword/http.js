import request from '../http';

import {urlPrepare, PRIVATE } from '../config';



function indexKeyWords(token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'keywords');
    return request(url, 'GET', token)
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
    indexKeyWords
}