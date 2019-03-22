const REGARRY = /{(\d+)}/gm;
const REGMAP = /{([^{}]+)}/gm;


String.prototype.cformat = function(args) {
    if (arguments.length === 0) throw Error('args error');
    if (arguments.length === 1 && typeof (args) === "object") return this.replace(REGMAP, (match, name) => args[name]);
    else return this.replace(REGARRY, (match, name) => args[~~name])
};


const GOPCONFIG = {

    BASEPATH: '/gop',

    API:  {
        host: '172.31.0.110',
        lan: '192.168.1.46',
        port: 7999,
        version: 'v1.0',
        login: '/n1.0/goperation/login',   /* login path */
        loginout: '/v1.0/goperation/login',   /* login path */
        token: null,
    },

    endpoints: ['fluttercomic', 'webadmin'],

    gogamechen1: {

        ROUTEPREFIX: 'gogamechen1',
        NAME: 'gogamechen1',
        MANAGERLOGIN: '/login',
        PHPAPI: {
            packages: '/notify_package.php',
            areas: '/notify_areas.php',
            groups: '/notify_areagroups.php',
            entity: 'http://172.23.0.131/notify_entity.php',
            reviews: 'http://172.23.0.131/get_reviewservers.php',
        },
        PHPADMIN: ''
    },

    fluttercomic: {
        ROUTEPREFIX: 'fluttercomic',
        NAME: 'fluttercomic',
        USERLOGIN: '/ulogin',
        MANAGERLOGIN: '/mlogin',
        CDNHOST: '172.17.0.3:7998',
        CDNPATH: 'cdn',
    },

    webadmin: {
        ROUTEPREFIX: 'webadmin',
        MANAGERLOGIN: '/login',
        NAME: 'webadmin',
    }

};


window.GOPCONFIG = GOPCONFIG;
