import  {ROUTEPREFIX} from '../../config';
import Error404Page from './Error404Page';

const Error404Route = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : `${ROUTEPREFIX}/errors/error-404`,
            component: Error404Page
        }
    ]
};

export default Error404Route
