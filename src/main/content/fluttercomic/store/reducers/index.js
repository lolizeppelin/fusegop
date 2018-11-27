import search from './search.reducer';
import {combineReducers} from 'redux';
import {injectReducer} from 'store';


const reducer = combineReducers({
    search
});


injectReducer('flutterComic', reducer);

export default reducer;
