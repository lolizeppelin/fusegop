import {authRoles} from 'auth';

import ComicList from './list/Comics';
import ComicCreate from './list/NewComic';
import ComicShow from './show/Comic';


import {ROUTEPREFIX} from "../config";

const ComicRoute = {
    auth    : authRoles.fluttercomic0manager,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/comic`,                             // create
            component: ComicCreate
        },
        {
            path     : `${ROUTEPREFIX}/comics/:cid`,                       // show
            component: ComicShow
        },
        {
            path     : `${ROUTEPREFIX}/comics`,                             // index
            component: ComicList
        },
        // {
        //     path     : `${ROUTEPREFIX}/comics/:cid/chapters/:chapter`,    // show comic chapter
        //     component: ChapterShow
        // },
    ]
};

export default ComicRoute;