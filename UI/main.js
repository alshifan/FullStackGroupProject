const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const targetProxy = process.env.API_PROXY;
if (targetProxy) {
  app.use(
    '/graphql',
    createProxyMiddleware({ target: targetProxy, changeOrigin: true })
  );
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.UI, () =>
  console.log('Server running on http://localhost:' + process.env.UI)
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
