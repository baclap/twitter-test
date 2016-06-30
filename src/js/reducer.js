import Immutable from 'immutable'
import { handleActions } from 'redux-actions';
import { increment } from './actions'

const initialState = Immutable.Map({
    val: 1,
})

const handlers = {
    [increment]: (state, { payload }) => {
        return state.set('val', state.get('val') + payload)
    },
}

export default handleActions(handlers, initialState)
