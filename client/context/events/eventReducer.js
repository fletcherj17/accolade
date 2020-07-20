import { 
    EVENT_FORM, 
    EVENT_UPDATE_FORM,
    GET_EVENTS,
    ADD_EVENT,
    UPDATE_EVENT,
    EVENT_ERROR,
    VALIDATE_EVENT,
    CURRENT_EVENT,
    DELETE_EVENT,
    GET_CREATOR,
    SPINNER_ON
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case EVENT_FORM:
            return {
                ...state,
                form: !state.form
            }
        case EVENT_UPDATE_FORM:
                return {
                    ...state,
                    formupdate: !state.formupdate
                }
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                event: action.payload[0],
                spinnerevent: null
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload],
                form: false,
                errorform: false
            }
            case UPDATE_EVENT:
                return {
                    ...state,
                    events: state.events.map(event => event._id === action.payload._id ? action.payload : event ),
                    formupdate: !state.formupdate,
                    event: action.payload
                }
        case VALIDATE_EVENT:
            return {
                ...state, 
                errorform: true
            }
        case CURRENT_EVENT:
            return {
                ...state,
                event: state.events.filter(event => event._id === action.payload )[0]
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload ),
                event: null
            }
        case EVENT_ERROR:
            return {
                ...state,
                message: action.payload
            }
            case GET_CREATOR:
                return {
                    ...state,
                    creatorInfo: action.payload
                }
        case SPINNER_ON:
            return {
                ...state,
                spinnerevent: true,
            }
        default:
            return state;
    }
}