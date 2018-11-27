import {authRoles} from 'auth';

import {FuseLoadable} from '@fuse';



import {ROUTEPREFIX} from "../config";

const ComicRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/comic`,                             // create
            component: FuseLoadable({loader: () => import('./list/NewComic')})
        },
        {
            path     : `${ROUTEPREFIX}/comics/:cid`,                       // show
            component: FuseLoadable({loader: () => import('./show/Comic')})
        },
        {
            path     : `${ROUTEPREFIX}/comics`,                             // index
            component: FuseLoadable({loader: () => import('./list/Comics')})
        },
    ]
};

export default ComicRoute;