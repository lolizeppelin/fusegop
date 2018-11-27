const GOPCONFIG = window.GOPCONFIG;


const ROUTEPREFIX = `${GOPCONFIG.BASEPATH}/${GOPCONFIG.fluttercomic.ROUTEPREFIX}`;

const APIPREFIX = `http://${GOPCONFIG.API.host}${GOPCONFIG.API.port === 80 ? '' : (':' + GOPCONFIG.API.port)}`;


const CDNURL = `http://${GOPCONFIG.fluttercomic.CDNHOST}/${GOPCONFIG.fluttercomic.CDNPATH}`;



const PUBLIC = 'public';
const PRIVATE = 'private';

const TYPES = {'private': 'v1.0', 'public': 'n1.0'};

const users_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/users`;
const user_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/users/{uid}`;
const user_path_ex = `${GOPCONFIG.fluttercomic.NAME}/{type}/users/{uid}/{ext}`;

const comics_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/comics`;
const comic_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/comics/{cid}`;
const comic_path_ex = `${GOPCONFIG.fluttercomic.NAME}/{type}/comics/{cid}/{ext}`;

const managers_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/managers`;
const manager_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/managers/{mid}`;
const manager_path_ex = `${GOPCONFIG.fluttercomic.NAME}/{type}/managers/{mid}/{ext}`;


const orders_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/orders`;
const order_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/orders/{oid}`;
const order_path_ex = `${GOPCONFIG.fluttercomic.NAME}/{type}/orders/{oid}/{ext}`;


const chapters_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/comic/{cid}/chapters`;
const chapter_path = `${GOPCONFIG.fluttercomic.NAME}/{type}/comic/{cid}/chapters/{chapter}`;
const chapter_path_ex = `${GOPCONFIG.fluttercomic.NAME}/{type}/comic/{cid}/chapters/{chapter}/{ext}`;


function urlPrepare(type, key, target = null) {


    let path = `/${TYPES[type]}`;
    switch (key) {
        case 'users': {
            path = `${path}/${users_path.cformat({type})}`;
            if (target && target.uid) path = `${path}/${target.uid}`;
            if (target && target.ext) path = `${path}/${target.ext}`;
            break;
        }
        case 'comics': {
            path = `${path}/${comics_path.cformat({type})}`;
            if (target && target.cid) path = `${path}/${target.cid}`;
            if (target && target.ext) path = `${path}/${target.ext}`;
            break;
        }
        case 'chapters': {
            path = `${path}/${chapters_path.cformat({type, cid: target.cid})}`;
            if (target.chapter) path = `${path}/${target.chapter}`;
            if (target && target.ext) path = `${path}/${target.ext}`;
            break;
        }
        case 'managers': {
            path = `${path}/${managers_path.cformat({ type })}`;
            if (target && target.mid) path = `${path}/${target.mid}`;
            if (target && target.ext) path = `${path}/${target.ext}`;
            break;
        }
        case 'orders': {
            path = `${path}/${orders_path.cformat({type})}`;
            if (target && target.mid) path = `${path}/${target.mid}`;
            if (target && target.ext) path = `${path}/${target.ext}`;
            break;
        }
        default: {
            const error = new Error(`Fluttercomic Not such url of ${type}`);
            error.target = target;
            throw error;
        }
    }
    console.log(`${APIPREFIX}${path}`);
    return `${APIPREFIX}${path}`
}

export {ROUTEPREFIX, CDNURL, PUBLIC, PRIVATE, urlPrepare}

