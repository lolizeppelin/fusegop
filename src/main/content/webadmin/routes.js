import LoginRoutes from './login/routes';
// import UserRoute from './users/routes';
import LogingRoute from './logging/routes';



const routes = [
    // ...StatisticsRoutes,
    ...LoginRoutes,
    UserRoute,
    LogingRoute,
];

export default routes;