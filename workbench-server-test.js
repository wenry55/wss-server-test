var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'password!1'};
var express = require('express');
var app = express();
app.use(express.urlencoded({limit:'50mb', extended:true}));
app.use(express.json({limit:'50mb', extended:true}));      // if needed
app
.get('/', (req, res) => {res.send('Hello!')})
.post('/', (req, res) => {
    console.log(`${new Date()}`)
    res.send('Hello Post')
    
});

// your express configuration here
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);