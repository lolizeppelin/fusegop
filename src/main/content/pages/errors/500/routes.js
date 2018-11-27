import  {ROUTEPREFIX} from '../../config';
import Error500Page from './Error500Page';

const Error500Route = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : `${ROUTEPREFIX}/errors/error-500`,
            component: Error500Page
        }
    ]
};

export default Error500Route