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
  })
);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
