const koa = require('koa')
const serve = require('koa-static')
const router = require('koa-router')()
const request = require('koa-request')
const env = require('node-env-file')

// production app on Heroku has no .env file, so we'll try and move on if we
// encounter an error as it's likely just that we're running in production
try {
	env('./.env')
} catch (e) {
	console.log('Error calling env.', e)
}

function staticDir() {
	return process.env.NODE_ENV === 'production' ? './public' : './dev-public'
}

router.get('/tweets/:username', function *(next) {
	const response = yield request({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=25&screen_name=' + this.params.username,
        headers: { 'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN }
	})
    if (response.statusCode !== 200) {
        this.throw(response.statusCode, response.body);
    }
	this.body = response.body
})

const app = koa()
app.use(serve(staticDir()))
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.PORT || 8080;
app.listen(port)
console.log(`Listening on port ${port}...`)
