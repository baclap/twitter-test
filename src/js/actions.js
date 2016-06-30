import { createAction } from 'redux-actions'
import {
    UPDATE_INPUT_VAL,
    REQUEST_TWEETS,
    RECEIVE_TWEETS,
    RECEIVE_TWEETS_ERROR,
    REMOVE_ERROR,
} from './constants'
import normalizeUsername from './util/normalizeUsername'
import { check200Status, parseJSON } from './util/fetch-helpers'

export const updateInputVal = createAction(UPDATE_INPUT_VAL, val => val)
const requestTweets = createAction(REQUEST_TWEETS)
const receiveTweets = createAction(RECEIVE_TWEETS, tweets => tweets)
const receiveTweetsError = createAction(RECEIVE_TWEETS_ERROR)
export const removeError = createAction(REMOVE_ERROR)

export function fetchTweets(username) {
    username = normalizeUsername(username)
    if (!username.length) {
        return
    }
    return (dispatch) => {
        dispatch(requestTweets())
        return fetch(`/tweets/${username}`)
        .then(check200Status)
        .then(parseJSON)
        .then((tweets) => {
            dispatch(receiveTweets(tweets))
        })
        .catch((error) => {
            dispatch(receiveTweetsError())
        })
    }
}
