# Twitter API Coding Test

My submission for the Twitter API portion of the coding test requested by StackCommerce.

Instructions: https://github.com/stacksocial/code-challenge/tree/master/frontend/js-twitter-api

## App Design

This app uses [application-only authentication](https://dev.twitter.com/oauth/application-only) to access the Twitter API. It has a very simple [Koa](http://koajs.com/) node server. The server only serves static assets in addition to making request for user tweets from the [/status/user_timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline) endpoint of the Twitter REST API.

The front end was build using React, Redux, and LESS. I have used Redux before but wanted to try a few things differently this time. Notably I made use of the [redux-actions](https://www.npmjs.com/package/redux-actions) to create my action creators and reducer.

For my CSS (LESS) I followed the [BEM](http://getbem.com/) philosophy. Mismanaged CSS is something I've wrestled with in the past and I wanted to give this methodology a try as I'm always looking for ways to improve this aspect of things. To aid with using the BEM methodology I used the [react-bem-helper](https://www.npmjs.com/package/react-bem-helper) library which generates appropriate class names to be used in React components, thus reducing a significant amount of typing.

### Notable Tools Used
- Node
- NPM
- Gulp
- Koa
- LESS
- React
- Redux
- Immutable

### Directory Structure Overview

#### dev-public vs public

This project has both a `public` and `dev-public` directory. The `dev-public` directory is where the dev server will serve static assets from. Running `gulp` to compile assets and watch for changes puts generated files in `dev-public`.

By running `gulp build` the assets will be compiled, minified, source maps will be omitted, and the bundled files will be placed in `public`. The `index.html` file from `dev-public` will be copied into `public` at this time also. The production application will serve assets from `public`.

#### src

The `src` directory is where the core of the app lives.

Its `js` subdirectory is fairly flat, there was no need to create multiple Redux reducers or separate the Redux action creators into multiple files for an app of this size. The front end application bootstraps through `app.jsx`.

The `less` directory contains a `main.less` which is the root file that imports all the other less files in proper order.

## Dev Environment

### Requirements
- `gulp`
- `node/npm` (I'm using node version 5.12.0)

### Setup
1. Create a `.env` file based of `.env.example`
    - the `TWITTER_KEY` and `TWITTER_SECRET` can be obtained by registering you app with Twitter (https://apps.twitter.com/)
    - you can leave `TWITTER_BEARER_TOKEN` unchanged and save the `.env` file, then run `node request-twitter-bearer-token`, if you have your `.env` file setup correctly it will print out the bearer token and you can add that to the `.env` file
2. Run `npm install`
3. Run `gulp` to compile the JS and LESS and watch for changes, this will also start a livereload server that will work with the [livereload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
4. Run `npm start` to start the local Koa server, then go to http://localhost:3000 in your browser to view the locally running app (port can be changed by changing `PORT` in the `.env` file)

### Deploy
1. Run `gulp build` to compile the JS and LESS for production
2. Run `heroku login` to login to Heroku
3. Run `heroku create` to create the Heroku app
4. Run `git push heroku master` to deploy code to app server
5. Run `heroku config:set TWITTER_BEARER_TOKEN=<TWITTER_BEAREER_TOKEN>` to set the bearer token environment variable
6. Run `heroku ps:scale web=1` to ensure at least one instance of the app is running
7. Run `heroku open` to launch the app in your browser
