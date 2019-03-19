import request from '../http'

import {urlPrepare, PUBLIC, PRIVATE} from '../config';

function webadminLogin(name, passwd, successCallback, failCallback) {
    const url = urlPrepare(PUBLIC, 'managers', { mid: name, ext: 'login'});
    const body = { passwd: passwd };
    return request(url, 'POST', null, body, null, false)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error.message); });
}




export {
    webadminLogin,
}