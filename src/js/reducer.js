import Immutable from 'immutable'
import { handleActions } from 'redux-actions';
import {
    UPDATE_INPUT_VAL,
    REQUEST_TWEETS,
    RECEIVE_TWEETS,
    RECEIVE_TWEETS_ERROR,
    REMOVE_ERROR,
} from './constants'
import normalizeUsername from './util/normalizeUsername'

const initialState = Immutable.Map({
    inputVal: '',
    inputIsDisabled: false,
    buttonIsDisabled: true,
    tweetsAreLoading: false,
    tweets: [],
    hasError: false,
})

const handlers = {
    [UPDATE_INPUT_VAL]: (state, { payload: val }) => {
        return state
            .set('inputVal', val)
            .set('buttonIsDisabled', normalizeUsername(val).length === 0)
    },
    [REQUEST_TWEETS]: (state) => {
        return state
            .set('inputIsDisabled', true)
            .set('buttonIsDisabled', true)
            .set('tweetsAreLoading', true)
            .set('tweets', [])
            .set('hasError', false)
    },
    [RECEIVE_TWEETS]: (state, { payload: tweets }) => {
        return state
            .set('inputIsDisabled', false)
            .set('buttonIsDisabled', false)
            .set('tweetsAreLoading', false)
            .set('tweets', tweets)
    },
    [RECEIVE_TWEETS_ERROR]: (state) => {
        return state
            .set('inputIsDisabled', false)
            .set('buttonIsDisabled', false)
            .set('tweetsAreLoading', false)
            .set('tweets', [])
            .set('hasError', true)
    },
    [REMOVE_ERROR]: (state) => {
        return state.set('hasError', false)
    },
}

export default handleActions(handlers, initialState)
