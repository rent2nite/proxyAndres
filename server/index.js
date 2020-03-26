// const express = require('express');
// const app = express();
// const httpProxy = require('http-proxy');
// const port = 3010
// const cors = require('cors');

// const proxy = httpProxy.createProxyServer({})

// app.use(cors());

// app.use(express.static(__dirname));


// app.all('/api/reservations/*', (req, res) => {
//     proxy.web(req, res, {
//       target: "http://localhost:3001"
//     });
//   });


//   app.listen(port, () => console.log(`Proxy server running on port ${port}`));

const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
const httpProxy = require("http-proxy");
const path = require('path');

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.all('/api/reservations/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

app.all('/api/recommendations', (req, res) => {
    proxy.web(req, res, {
      target: "http://localhost:3030"
    });
  });

  app.all('/api/*', (req, res) => {
    proxy.web(req, res, {
      target: "http://localhost:3009"
    });
  });


  app.all('/*', (req, res) => {
    proxy.web(req, res, {
      target: "http://localhost:1000"
    });
  });


app.listen(port, () => console.log(`Proxy server running on port ${port}`));