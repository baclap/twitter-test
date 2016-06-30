import Immutable from 'immutable'
import { handleActions } from 'redux-actions';
import { UPDATE_INPUT_VAL, REQUEST_TWEETS, RECEIVE_TWEETS } from './constants'
import normalizeUsername from './util/normalizeUsername'

const initialState = Immutable.Map({
    inputVal: '',
    inputIsDisabled: false,
    buttonIsDisabled: true,
    tweetsAreLoading: false,
    tweets: [],
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
    },
    [RECEIVE_TWEETS]: (state, { payload: tweets }) => {
        return state
            .set('inputIsDisabled', false)
            .set('buttonIsDisabled', false)
            .set('tweetsAreLoading', false)
            .set('tweets', tweets)
    },
}

export default handleActions(handlers, initialState)
