import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY, ENTRIES_LOADING, WIPE_ENTRIES } from '../actions/types';

const initialState = {
    entries: [],
    loading: false,
    loaded: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ENTRIES: 
            return {
                ...state, 
                entries: action.payload,
                loading: false,
            }
        case DELETE_ENTRY: 
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload)
            }
        case ADD_ENTRY: 
            return {
                ...state,
                entries: [action.payload, ...state.entries]
            }
        case ENTRIES_LOADING:
            return {
                ...state, 
                loading: true,
                loaded: true
            }
        case WIPE_ENTRIES:
            return {
                ...state,
                entries: [],
                loaded: false
            }
        default:
            return state;
    }
} 