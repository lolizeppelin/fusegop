import request from '../http'

import {urlPrepare, PUBLIC, PRIVATE} from '../config';

function managerLogin(name, passwd, successCallback, failCallback) {
    const url = urlPrepare(PUBLIC, 'managers', { mid: name, ext: 'login'});
    const body = { passwd: passwd };
    return request(url, 'POST', null, body, null, false)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}


function userLogin(name, passwd, successCallback, failCallback) {
    const url = urlPrepare(PUBLIC, 'users', { uid: name, ext: 'login'});
    const body = { passwd: passwd };
    return request(url, 'POST', null, body, null, false)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result.data[0]);
        })
        .catch((error) => { failCallback(error); });
}



export {
    managerLogin,
    userLogin,
}