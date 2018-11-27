import EndpointsRoute from './endpoints/routes'
import Error400Routes from './errors/400/routes'
import Error404Routes from './errors/404/routes'
import Error500Routes from './errors/500/routes'
import IconsRoute from './icons/routes'



export const PageRoutes = [
    EndpointsRoute,
    Error400Routes,
    Error404Routes,
    Error500Routes,
    IconsRoute,
];

export default PageRoutes