import axios from 'axios';
import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY, ENTRIES_LOADING } from './types';

export const getEntries = () => dispatch => {
    dispatch(setEntriesLoading());
    axios
        .get('/api/entries')
        .then(res => 
            dispatch({
                type: GET_ENTRIES,
                payload: res.data
            })
        )
};

export const addEntry = (entry) => dispatch => {
    axios
        .post('/api/entries', entry)
        .then(res =>
            dispatch({
                type: ADD_ENTRY,
                payload: res.data
            })
        )

};

export const deleteEntry = (entryId) => dispatch => {
    axios
        .delete(`/api/entries/${entryId}`)
        .then(res => 
            dispatch({
                type: DELETE_ENTRY,
                payload: entryId
            })
        )
};

export const setEntriesLoading = () => {
    return {
        type: ENTRIES_LOADING
    }
};