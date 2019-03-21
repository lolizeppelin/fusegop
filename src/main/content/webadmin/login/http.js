import request from '../http'

import {urlPrepare, PUBLIC} from '../config';

function webadminLogin(name, passwd, successCallback, failCallback) {
    const url = urlPrepare(PUBLIC, 'login', { name: name});


    const body = { password: passwd };
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