// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Target URL of the site you want to proxy
const targetUrl = 'https://www.google.com/'; // Replace with the actual URL

// Proxy middleware to forward requests
app.use(
  '/google',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true, // Ensures the Host header matches the target URL
    pathRewrite: { '^/google': '' }, // Removes /ifs from the URL path
  })
);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
