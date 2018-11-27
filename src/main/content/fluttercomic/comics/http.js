import request from '../http';

import {urlPrepare, PRIVATE, PUBLIC} from '../config';

function showComic(cid, token, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'comics', { cid });
    return request(url, 'GET', token)
        .then((response) => {
            const result = response.data;
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => { failCallback(error); });
}


function indexComics(successCallback, failCallback) {
    const url = urlPrepare(PUBLIC, 'comics');
    return request(url, 'GET')
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


function createComics(token, body, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'comics');
    return request(url, 'POST', token, body)
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

function coverComics(cid, token, body, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'comics', { cid, ext: 'cover' });
    return request(url, 'PUT', token, body)
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



function createChapters(cid, chapter, token, body, successCallback, failCallback) {
    const url = urlPrepare(PRIVATE, 'chapters', { cid, chapter });
    return request(url, 'POST', token, body)
        .then((response) => {
            const result = response.data;  /* Get data from http body */
            if (result.resultcode !== 0) throw Error(result.result);
            successCallback(result);
        })
        .catch((error) => {
            console.log(error);
            failCallback(error);
        });
}

//
// function showUserOwns(uid, token, successCallback, failCallback) {
//     const url = urlPrepare(PRIVATE, 'users', { uid, ext: 'owns' });
//     return request(url, 'GET', token)
//         .then((response) => {
//             const result = response.data;
//             if (result.resultcode !== 0) throw Error(result.result);
//             successCallback(result);
//         })
//         .catch((error) => { failCallback(error); });
// }


export {
    showComic,
    indexComics,
    createComics,
    coverComics,
    createChapters,
}