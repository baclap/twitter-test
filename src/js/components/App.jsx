import React, { Component, PropTypes } from 'react'
import Form from './Form'
import Results from './Results'

export default class App extends Component {
    render() {
        return (
            <div>
                <Form />
                <Results />
            </div>
        )
    }
}
App.propTypes = {
    //
    actions: PropTypes.object.isRequired,
}
