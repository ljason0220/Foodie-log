import { combineReducers } from 'redux';
import entryReducer from './entryReducer';

export default combineReducers({
    entry: entryReducer
});