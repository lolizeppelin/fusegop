import {authRoles} from 'auth';

import Order from './list';

import {ROUTEPREFIX} from "../config";

const OrderRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/orders`,                   // index
            component: OrderList
        },
        {
            path     : `${ROUTEPREFIX}/orders/:oid`,              // show
            component: OrderShow
        },
    ]
};

export default Routes;