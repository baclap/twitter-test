import Immutable from 'immutable'

const initialState = Immutable.Map({
    val: 1,
})

const handlers = {
    increment(state, { amount }) {
        return state.set('val', state.get('val') + amount)
    },
}

export default function reducer(state = initialState, action) {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
}
