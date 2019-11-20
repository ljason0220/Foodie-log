import { combineReducers } from 'redux';
import entryReducer from './entryReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    entry: entryReducer,
    error: errorReducer,
    auth: authReducer
});