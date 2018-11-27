import * as FlutterComicActions from '../actions';

const initialState = {
    text: ''
};

const searchReducers = function (state = initialState, action) {
    switch ( action.type )
    {
        case FlutterComicActions.SET_FLUTTERCOMIC_SEARCHTEXT:
        {
            return {
                ...state,
                text: action.text,
            };
        }
        case FlutterComicActions.CLEAN_FLUTTERCOMIC_SEARCHTEXT:
        {
            return initialState;
        }
        default:
        {
            return state;
        }
    }
};



export default searchReducers;