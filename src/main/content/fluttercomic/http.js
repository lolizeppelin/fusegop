import axios from 'axios/index';
import {APIHEAD, FERNETHEAD, TOKENHEAD} from './constant.js';

const Jsonlint = require('main/utils/jsonlint.js');

function request(url, method = 'GET', token = null, body = null,
                 headers = null, fernet = false, timeout = 5000,
                 jsonlint = false) {
    headers = Object.assign(APIHEAD, headers);
    if (token) headers[[TOKENHEAD]] = token;
    if (fernet) headers[[FERNETHEAD]] = 'yes';
    const config = {url,
        method, headers, data: body, timeout,
    };

    if (jsonlint) {
        config.transformResponse =
            [function (data) {
                if (typeof data === 'string') {
                    try {
                        // data = JSON.parse(data);
                        return Jsonlint.parse(data)
                    } catch (e) { /* Ignore */ }
                }
                return data;
        }]
    }

    return axios.request(config)
}

export default request;

