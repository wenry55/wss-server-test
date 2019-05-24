const kafka = require('kafka-node');
const bp = require('body-parser');
const config = require('./config');

try {
  // const Consumer = kafka.HighLevelConsumer;
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({kafkaHost: '192.168.1.104:9092'});
  // const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new Consumer(
    client,
    [{ topic: 'test9042', partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', async function(message) {
    console.log('here');
    console.log(
      'kafka-> ',
      message.value
    );
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
