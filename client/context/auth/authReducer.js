import { 
    SIGNUP_OK,
    SIGNUP_ERROR,
    HIDE_ALERT,
    LOGIN_OK,
    LOGIN_ERROR,
    USER_AUTENTICATED,
    LOG_OUT,
    SPINNER_ON
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SIGNUP_OK:
        case SIGNUP_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                msg: action.payload
            }       
        case LOGIN_OK: 
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticated: true,
                spinnerauth: false
            }
        case HIDE_ALERT:
            return {
                ...state,
                msg: null
            } 
        case USER_AUTENTICATED:
            return {
                ...state,
                user: action.payload,
                autenticated: true
            }
        case LOG_OUT: 
            localStorage.removeItem('token');
            return {
                ...state,
                user: null, 
                token: null,
                autenticated: null,

            }
            case SPINNER_ON:
                return {
                  ...state,
                  spinnerauth: true
                };
        default:
            return state;
    }
}