import {FuseLoadable} from '@fuse';


import {ROUTEPREFIX} from "../config";
import authRoles from "../authRoles";

const UserRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/users/:uid`,              // show
            component: FuseLoadable({loader: () => import('./show/User')})
        },
        {
            path     : `${ROUTEPREFIX}/users`,                   // index
            component: FuseLoadable({loader: () => import('./list/Users')})
        },
    ]
};

export default UserRoute;