import {FuseLoadable} from '@fuse';


import {ROUTEPREFIX} from "../config";
import authRoles from "../authRoles";

const OrderRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/orders`,                   // index
            component: FuseLoadable({loader: () => import('./list')})
        },
        {
            path     : `${ROUTEPREFIX}/orders/:oid`,              // show
            component: FuseLoadable({loader: () => import('./show')})
        },
    ]
};

export default OrderRoute;