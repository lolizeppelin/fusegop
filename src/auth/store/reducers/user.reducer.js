import * as Actions from '../actions';

const initialStateDefault = {
    role: 'guest',
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const initialState = {

    from:   'fernet',


    role:   'guest',
    /* base dat of gop */
    uid:    0,
    name:   '',
    token:  '',

    data: {
        'displayName': '',
        'photoURL'   : 'assets/images/avatars/anyone.jpg',
        'email'      : '',
        /* ext data for gop*/
        'ext'        : {},
        shortcuts    : []
    }
};


const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
