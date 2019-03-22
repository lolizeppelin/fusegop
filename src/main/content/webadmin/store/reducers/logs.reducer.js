import * as WebadminAction from '../actions';

const initialState = {
    logs: [],
    post: 0,
};

const logsReducers = function (state = initialState, action) {


    switch (action.type)
    {

        case WebadminAction.SET_WEBADMIN_LOGS:
        {
            return {
                post: action.post,
                logs: action.logs,
            };
        }
        default:
        {
            return state;
        }
    }
};



export default logsReducers;