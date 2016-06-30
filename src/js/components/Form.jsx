import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'

const BLOCK_CLASS = 'Form'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Form extends Component {
    render() {
        return (
            <div className={BLOCK_CLASS}>
                <input type="text" {...classes('input')} placeholder="@username" />
                <a href="javascript:void(0)" {...classes('button')}>
                    Fetch Recent Tweets
                </a>
            </div>
        )
    }
}
Form.propTypes = {
}
