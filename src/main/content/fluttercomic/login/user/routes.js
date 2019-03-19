import User from './login';
import {ROUTEPREFIX} from "../../config";
import authRoles from "../../authRoles";

 const Routes = {
     settings: {
         layout: {
             config: {
                 navbar        : {
                     display: false
                 },
                 toolbar       : {
                     display: false
                 },
                 footer        : {
                     display: false
                 },
                 leftSidePanel : {
                     display: false
                 },
                 rightSidePanel: {
                     display: false
                 }
             }
         }
     },
    // auth    : authRoles.onlyGuest,
    routes  : [
        {
            path     : `${ROUTEPREFIX}/user/login`,
            component: User
        }
    ]
};

export default Routes;