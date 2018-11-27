import LoginRoutes from './login/routes';
import UserRoute from './users/routes';
import ComicRoute from './comics/routes';
// import StatisticsRoutes from './statistics/routes';
// import ManagerRoute from './managers/routes';

// import OrderRoute from './comics/routes';



const routes = [
    // ...StatisticsRoutes,
    ...LoginRoutes,
    UserRoute,
    // ManagerRoute,
    ComicRoute,
    // OrderRoute,
];

export default routes;