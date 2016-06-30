import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'

const BLOCK_CLASS = 'Results'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Results extends Component {
    content() {
        // loading or cards or nothing...
    }
    render() {
        return (
            <div className={BLOCK_CLASS}>
                {this.content()}
            </div>
        )
    }
}
Results.propTypes = {
}
