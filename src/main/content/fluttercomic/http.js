import axios from 'axios/index';
import {APIHEAD, FERNETHEAD, TOKENHEAD} from './constant.js';

function request(url, method = 'GET', token = null, body = null,
                 headers = null, fernet = false, timeout = 5000) {
    headers = Object.assign(APIHEAD, headers);
    if (token) headers[[TOKENHEAD]] = token;
    if (fernet) headers[[FERNETHEAD]] = 'yes';
    const config = {url, method, headers, data: body, timeout};
    return axios.request(config)
}

export default request;

