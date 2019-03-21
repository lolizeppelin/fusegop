import {FuseLoadable} from '@fuse';

import authRoles from "../authRoles";
import {ROUTEPREFIX} from "../config";

const LoggingRoute = {
    auth    : authRoles.webadmin,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/keywords`,                             // index
            component: FuseLoadable({loader: () => import('./Keywords')})
        },
    ]
};

export default LoggingRoute;