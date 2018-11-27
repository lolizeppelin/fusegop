import {authRoles} from 'auth';

import UserList from './list/Users';
import UserShow from './show/User';

import {ROUTEPREFIX} from "../config";

const UserRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/users/:uid`,              // show
            component: UserShow
        },
        {
            path     : `${ROUTEPREFIX}/users`,                   // index
            component: UserList
        },
    ]
};

export default UserRoute;