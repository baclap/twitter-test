import React, { Component, PropTypes } from 'react'
import BEMHelper from 'react-bem-helper'
import dateformat from 'dateformat'
import pluralize from 'pluralize'

const BLOCK_CLASS = 'TweetCard'
const classes = new BEMHelper(BLOCK_CLASS)

export default class TweetCard extends Component {
    retweets() {
        const { retweetCount: num } =  this.props
        return num + ' ' + pluralize('Retweet', num)
    }
    favorites() {
        const { favoriteCount: num } =  this.props
        return num + ' ' + pluralize('Favorite', num)
    }
    date() {
        return dateformat(
            new Date(this.props.createdAt),
            'm-d-yy h:MM TT'
        )
    }
    render() {
        return (
            <div className={BLOCK_CLASS}>
                <div {...classes('text')}>{this.props.text}</div>
                <div {...classes('details')}>
                    <div {...classes('details-item')}>{this.retweets()}</div>
                    <div {...classes('details-item')}>{this.favorites()}</div>
                    <div {...classes('details-item')}>{this.date()}</div>
                </div>
            </div>
        )
    }
}
TweetCard.propTypes = {
    text: PropTypes.string.isRequired,
    retweetCount: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
}
