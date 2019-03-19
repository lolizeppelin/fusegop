const GOPCONFIG = window.GOPCONFIG;


const ROUTEPREFIX = `${GOPCONFIG.BASEPATH}/${GOPCONFIG.webadmin.ROUTEPREFIX}`;

const APIPREFIX = `http://${GOPCONFIG.API.host}${GOPCONFIG.API.port === 80 ? '' : (':' + GOPCONFIG.API.port)}`;



const PUBLIC = 'public';
const PRIVATE = 'private';

const TYPES = {'private': 'v1.0', 'public': 'n1.0'};

const users_path = `${GOPCONFIG.webadmin.NAME}/{type}/users`;
const user_path = `${GOPCONFIG.webadmin.NAME}/{type}/users/{uid}`;
const user_path_ex = `${GOPCONFIG.webadmin.NAME}/{type}/users/{uid}/{ext}`;


const logs_path = `${GOPCONFIG.webadmin.NAME}/{type}/logs`;
const log_path = `${GOPCONFIG.webadmin.NAME}/{type}/logs/{id}`;


const keywords_path = `${GOPCONFIG.webadmin.NAME}/{type}/keyswords`;
const keyword_path = `${GOPCONFIG.webadmin.NAME}/{type}/keysword/{kid}`;




function urlPrepare(type, key, target = null) {

    let path = `/${TYPES[type]}`;
    switch (key) {
        case 'users': {
            path = `${path}/${users_path.cformat({type})}`;
            if (target && target.uid) path = `${path}/${target.uid}`;
            break;
        }
        case 'logs': {
            path = `${path}/${logs_path.cformat({type})}`;
            if (target && target.id) path = `${path}/${target.id}`;
            break;
        }
        case 'keywords': {
            path = `${path}/${keywords_path.cformat({type})}`;
            if (target.kid) path = `${path}/${target.kid}`;
            break;
        }
    }
    console.log(`${APIPREFIX}${path}`);
    return `${APIPREFIX}${path}`
}

export {ROUTEPREFIX, PUBLIC, PRIVATE, urlPrepare}

