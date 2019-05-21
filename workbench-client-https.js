var https = require('https');

var options = {
  host: 'localhost',
  port: 8443,
  path: '/',
  method: 'POST'
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var req = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();