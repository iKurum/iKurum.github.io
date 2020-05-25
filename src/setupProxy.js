const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://emiliatan.online:5173',
      pathRewrite: {
        '^/api': '/'
      },
      changeOrigin: true
    }));
  app.use(
    '/ms',
    createProxyMiddleware({
      target: 'https://graph.microsoft.com/v1.0/me',
      pathRewrite: {
        '^/ms': '/'
      },
      changeOrigin: true
    }));
}