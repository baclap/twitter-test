const koa = require('koa')
const serve = require('koa-static')
const router = require('koa-router')()
const request = require('koa-request')
const env = require('node-env-file')

env('./.env')

router.get('/tweets/:username', function *(next) {
	const response = yield request({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + this.params.username,
        headers: { 'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN }
	})
    if (response.statusCode !== 200) {
        this.throw(response.statusCode, response.body);
    }
	this.body = response.body
})

const app = koa()
app.use(serve('./public'))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
console.log('Listening on port 3000...')
