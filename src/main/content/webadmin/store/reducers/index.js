import fetchlog from './logs.reducer';
import {combineReducers} from 'redux';
import {injectReducer} from 'store';


const reducer = combineReducers({
    fetchlog
});


injectReducer('webAdmin', reducer);

export default reducer;
