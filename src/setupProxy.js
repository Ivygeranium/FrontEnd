const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://hanji-serve.herokuapp.com',
          changeOrigin: true
      })
  )
};