import  {ROUTEPREFIX} from '../config';
import EndpointPage from './endpoints';

const EndpointsRoute = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : `${ROUTEPREFIX}/endpoints/:endpoint`,
            component: EndpointPage
        }
    ]
};

export default EndpointsRoute
