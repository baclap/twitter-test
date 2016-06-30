import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'

const BLOCK_CLASS = 'Form'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Form extends Component {
    handleInputChange(e) {
        this.props.updateInputVal(e.target.value)
    }
    handleInputKeyUp(e) {
        if (e.keyCode === 13 && !this.props.buttonIsDisabled) {
            this.props.fetchTweets(this.props.inputVal)
        }
    }
    handleButtonClick() {
        this.props.fetchTweets(this.props.inputVal)
    }
    render() {
        const {
            inputVal,
            inputIsDisabled,
            buttonIsDisabled,
        } = this.props
        return (
            <div className={BLOCK_CLASS}>
                <input
                    type="text"
                    placeholder="@username"
                    onChange={::this.handleInputChange}
                    onKeyUp={::this.handleInputKeyUp}
                    value={inputVal}
                    disabled={inputIsDisabled}
                    {...classes('input', {
                        'disabled': inputIsDisabled
                    })}
                />
                <a
                    href="javascript:void(0)"
                    disabled={buttonIsDisabled}
                    onClick={::this.handleButtonClick}
                    {...classes('button', {
                        'disabled': buttonIsDisabled
                    })}
                >
                    Fetch Recent Tweets
                </a>
            </div>
        )
    }
}
Form.propTypes = {
    inputVal: PropTypes.string.isRequired,
    inputIsDisabled: PropTypes.bool.isRequired,
    buttonIsDisabled: PropTypes.bool.isRequired,
    updateInputVal: PropTypes.func.isRequired,
    fetchTweets: PropTypes.func.isRequired,
}
