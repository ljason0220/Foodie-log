import axios from 'axios';
import { GET_ENTRIES, ADD_ENTRY, DELETE_ENTRY, ENTRIES_LOADING, WIPE_ENTRIES } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getEntries = (userId) => dispatch => {
    dispatch(setEntriesLoading());
    axios
        .get(`/api/entries/${userId}`)
        .then(res => 
            dispatch({
                type: GET_ENTRIES,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addEntry = (entry) => (dispatch, getState) => {
    axios
        .post('/api/entries', entry, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ENTRY,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteEntry = (entryId) => (dispatch, getState) => {
    axios
        .delete(`/api/entries/${entryId}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: DELETE_ENTRY,
                payload: entryId
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setEntriesLoading = () => {
    return {
        type: ENTRIES_LOADING
    }
};

export const wipeEntries = () => {
    return {
        type: WIPE_ENTRIES
    };
};