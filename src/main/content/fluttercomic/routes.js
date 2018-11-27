import LoginRoutes from './login/routes';
import UserRoute from './users/routes';
import ComicRoute from './comics/routes';
import reducer from './store/reducers';



const routes = [
    // ...StatisticsRoutes,
    ...LoginRoutes,
    UserRoute,
    // ManagerRoute,
    ComicRoute,
    // OrderRoute,
];

export default routes;