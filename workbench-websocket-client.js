var WebSocket = require('ws');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var ws = new WebSocket("wss://localhost:8443");
var bigmsg = 'x'.repeat(10*1024*1024)

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(message) {
  message = message.trim();
  // ws.send(message, console.log.bind(null, 'Sent : ', message));
  ws.send(bigmsg, console.log.bind(null, 'Sent : ', bigmsg.length));
});

ws.on('message', function(message) {
  console.log('Received: ' + message);
});

ws.on('close', function(code) {
  console.log('Disconnected: ' + code);
});

ws.on('error', function(error) {
    console.log('Error: ' + error.code);
});