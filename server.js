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
    pathRewrite: { '^/google': '' }, // Removes /google from the URL path

    // Modify the response headers
    onProxyRes: function (proxyRes, req, res) {
      // Remove the X-Frame-Options header
      delete proxyRes.headers['x-frame-options'];
      // Add CORS headers
      res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS'); // Allow specific methods
      res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    },
  })
);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
