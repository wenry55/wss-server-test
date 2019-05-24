const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');
var count = 100;
var rets = 0;
var message_x = 'x'.repeat(1*1024*1024)

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: '192.168.1.104:9092'});
const producer = new Producer(client);
const kafka_topic = 'test9042';
console.log(kafka_topic);

function send() {
  
  // var message = new Date().toString();
  producer.send([{ topic: 'test9042', messages: [message_x] }], function (err, data) {
    if (err) console.log(err);

    else  {
      ++rets;
      if (rets % 10 == 0) {
        console.log('send %d messages', rets);
      }
    }

    if (rets === count) {
      console.log(`closed: ${new Date()}`)
      process.exit();
      
    }
    send()
  });
}

try {

  let payloads = [
    {
      topic: kafka_topic,
      messages: 'x'.repeat(2*1024*1024)
    }
  ];





  producer.on('ready', async function() {
    // let push_status = producer.send(payloads, (err, data) => {
    //   if (err) {
    //     console.log('[kafka-producer -> '+kafka_topic+']: broker update failed');
    //   } else {
    //     console.log('[kafka-producer -> '+kafka_topic+']: broker update success');
    //   }
    // });
    console.log(`started: ${new Date()}`)
    send()
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
    throw err;
  });

  
}
catch(e) {
  console.log(e);
}