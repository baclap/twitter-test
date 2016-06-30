import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'

const BLOCK_CLASS = 'Tweets'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Tweets extends Component {
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
Tweets.propTypes = {
    tweetsAreLoading: PropTypes.bool.isRequired,
    tweets: PropTypes.array.isRequired,
}
