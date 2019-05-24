var WebSocket = require('ws');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var ws = new WebSocket("wss://codiplay.com:8443");
var bigmsg = 'x'.repeat(70*1024)

var count = 10000;
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(message) {
  message = message.trim();
  // ws.send(message, console.log.bind(null, 'Sent : ', message));
  console.log(`Start: ${new Date}`)
  ws.send(bigmsg, console.log.bind(null, 'Sent : ', bigmsg.length));
});

ws.on('message', function(message) {
  // console.log(`Received: ${message} ${new Date()}, ${count}`);
  if (count > 0) {
    // ws.send(bigmsg, console.log.bind(null, 'Sent : ', bigmsg.length));
    ws.send(bigmsg); 
    count--;
  } else {
      console.log(`End: ${new Date}`)
  }
});

ws.on('close', function(code) {
  console.log('Disconnected: ' + code);
});

ws.on('error', function(error) {
    console.log('Error: ' + error.code);
});