import {FuseLoadable} from '@fuse';
import LoginRoutes from './login/routes';
import UserRoute from './keyword/routes';
import LogingRoute from './logging/routes';
import {ROUTEPREFIX} from "./config";
import authRoles from "./authRoles";
import reducer from './store/reducers';



const WelcomRoute = {
    auth    : authRoles.webadmin,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/welcome`,                             // index
            component: FuseLoadable({loader: () => import('./welcome')})
        },
    ]
};




const routes = [
    // ...StatisticsRoutes,
    LoginRoutes,
    UserRoute,
    LogingRoute,
    WelcomRoute,
];

export default routes;