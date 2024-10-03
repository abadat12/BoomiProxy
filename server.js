// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Target URL of the site you want to proxy
const targetUrl =
  'https://rks23r1test.eastus.cloudapp.azure.com/main/ifsapplications/web/page/ManualSupplierInvoice/Form;$filter=InvoiceId%20eq%20105/'; // Replace with the actual URL

// Proxy middleware to forward requests
app.use(
  '/ifs',
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true, // Ensures the Host header matches the target URL
    pathRewrite: { '^/ifs': '' }, // Removes /ifs from the URL path

    // Modify the response headers
    onProxyRes: function (proxyRes, req, res) {
      // Remove unwanted headers
      delete proxyRes.headers['x-frame-options'];
      delete proxyRes.headers['content-security-policy'];
      delete proxyRes.headers['set-cookie'];

      // Allow all origins
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    },

    // Error handling
    onError: function (err, req, res) {
      console.error('Proxy error:', err.message);
      res
        .status(500)
        .send(
          'Something went wrong while trying to proxy the request: ' +
            err.message
        );
    },

    // Log the request
    onProxyReq: function (proxyReq, req, res) {
      console.log(`Proxying request to: ${targetUrl}${req.url}`);
    },
  })
);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
