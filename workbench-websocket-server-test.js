var fs = require('fs');
var https = require('https');
var express = require('express');
var ws = require('ws')
var app = express();

var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'password!1'};
var httpsServer = https.createServer(credentials);
httpsServer.listen(8443);

var websocketserver = require('ws').Server
var wss = new websocketserver({server: httpsServer})

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message.length)
        ws.send(`Ack : ${message.length}, ${new Date()}`)
    });
})

