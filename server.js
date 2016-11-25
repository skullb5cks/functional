var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.develop');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxy = require('http-proxy-middleware');

var app = express();
var compiler = webpack(webpackConfig);

// app.use(express.static(path.join(__dirname, '../')));
// app.use(proxy(['/api/**'], { target: 'http://localhost:8088' }));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8181, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:8181');
});
