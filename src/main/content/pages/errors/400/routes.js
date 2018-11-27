import  {ROUTEPREFIX} from '../../config';
import Error400Page from './Error400Page';

const Error400Route = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : `${ROUTEPREFIX}/errors/error-400`,
            component: Error400Page
        }
    ]
};

export default Error400Route
