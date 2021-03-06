var https = require("https");
const querystring = require("querystring");

var bigmsg = "x".repeat(1024 * 1024 * 1);

var post_data = querystring.stringify({
  msg: bigmsg
});

var options = {
  host: "localhost",
  port: 8443,
  path: "/",
  method: "POST",
  headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Content-Length': bigmsg.length
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(post_data)
  }
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function send() {
  var req = https.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      //console.log('BODY: ' + chunk);
    });
  });

  req.on("error", function(e) {
    console.log("problem with request: " + e.message);
  });

  // write data to request body
  // req.write(postData);

  req.write(post_data);
  req.end();
  // req.end(post_data);
}

console.log(`${new Date()}`);
for (var i = 0; i < 100; i++) {
  send();
}
console.log(`${new Date()}`);

console.log("Press any key to exit");

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", process.exit.bind(process, 0));
