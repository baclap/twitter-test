import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'
import TweetCard from './TweetCard'

const BLOCK_CLASS = 'Tweets'
const classes = new BEMHelper(BLOCK_CLASS)

export default class Tweets extends Component {
    content() {
        const {
            tweetsAreLoading,
            tweets
        } = this.props

        if (tweetsAreLoading) {
            return <div {...classes('loading')} />
        }

        return tweets.map((tweet) => {
            return (
                <TweetCard
                    key={tweet.id}
                    text={tweet.text}
                    createdAt={tweet.created_at}
                    retweetCount={tweet.retweet_count}
                    favoriteCount={tweet.favorite_count}
                />
            )
        })
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
