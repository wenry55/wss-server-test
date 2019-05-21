var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'password!1'};
var express = require('express');
var app = express();

app
.get('/', (req, res) => {res.send('Hello!')})
.post('/', (req, res) => {res.send('Hello Post')});

// your express configuration here
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);