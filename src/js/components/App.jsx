import React, { Component, PropTypes } from 'react'
import Form from './Form'
import Tweets from './Tweets'

export default class App extends Component {
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
    actions: PropTypes.object.isRequired,
}
