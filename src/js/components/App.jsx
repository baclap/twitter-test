import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

export default class App extends Component {
    render() {
        const { actions, val } = this.props
        return (
            <button onClick={() => actions.increment(val)}>{val}</button>
        )
    }
}
App.propTypes = {
    val: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
}
