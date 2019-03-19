import {FuseLoadable} from '@fuse';

import authRoles from "../authRoles";
import {ROUTEPREFIX} from "../config";

const LoggingRoute = {
    auth    : authRoles.webadmin,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/logs/:id`,                       // show
            component: FuseLoadable({loader: () => import('./Log')})
        },
        {
            path     : `${ROUTEPREFIX}/logs`,                             // index
            component: FuseLoadable({loader: () => import('./Logs')})
        },
    ]
};

export default LoggingRoute;