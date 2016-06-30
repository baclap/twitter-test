// gulp starts this, use with the chrome extension
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
var livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");
