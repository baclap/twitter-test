import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'

const BLOCK_CLASS = 'Error'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Error extends Component {
    render() {
        return (
            <div className={BLOCK_CLASS}>
                <div>We were unable to fetch any tweets for that user. Please try again.</div>
                <a
                    href="javascript:void(0)"
                    onClick={this.props.dismiss}
                    dangerouslySetInnerHTML={{__html: '&times;'}}
                    {...classes('x')}
                />
            </div>
        )
    }
}
Error.propTypes = {
    dismiss: PropTypes.func.isRequired,
}
