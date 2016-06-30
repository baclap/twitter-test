import React from 'react'
import App from './components/App'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'
import * as actions from './actions'
import store from './store'

const AppContainer = connect(
    (state) => {
        return state.toJS()
    },
    (dispatch) => {
        return { actions: bindActionCreators(actions, dispatch) }
    }
)(App)

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector('#app')
)
