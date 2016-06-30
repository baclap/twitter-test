import React, { Component, PropTypes } from 'react'
import Form from './Form'
import Tweets from './Tweets'
import Error from './Error'

export default class App extends Component {
    error() {
        if (this.props.hasError) {
            return <Error dismiss={this.props.actions.removeError} />
        }
    }
    render() {
        const {
            inputVal,
            inputIsDisabled,
            buttonIsDisabled,
            tweetsAreLoading,
            tweets,
            actions,
        } = this.props
        return (
            <div>
                <Form
                    inputVal={inputVal}
                    inputIsDisabled={inputIsDisabled}
                    buttonIsDisabled={buttonIsDisabled}
                    updateInputVal={actions.updateInputVal}
                    fetchTweets={actions.fetchTweets}
                />
                {this.error()}
                <Tweets tweetsAreLoading={tweetsAreLoading} tweets={tweets} />
            </div>
        )
    }
}
App.propTypes = {
    inputVal: PropTypes.string.isRequired,
    inputIsDisabled: PropTypes.bool.isRequired,
    buttonIsDisabled: PropTypes.bool.isRequired,
    tweetsAreLoading: PropTypes.bool.isRequired,
    tweets: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
}
