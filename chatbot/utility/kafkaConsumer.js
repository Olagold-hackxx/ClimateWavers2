const kafka = require('kafka-node');

const receivedMessages = []; // To store received messages

const consumerOptions = {
  kafkaHost: 'zkless-kafka-bootstrap:9092',
  groupId: 'group_1',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
};

const consumer = new kafka.ConsumerGroup(consumerOptions, ['user_messages']);

console.log('Kafka consumer is listening for messages...');

consumer.on('message', function(message) {
  console.log('Received message:', message.value);
  receivedMessages.push(JSON.parse(message.value)); // Store the received message in memory
});

consumer.on('error', function(err) {
  console.error('Error:', err);
});

consumer.on('offsetOutOfRange', function(err) {
  console.error('Offset out of range:', err);
});

process.on('SIGINT', function() {
  consumer.close(true, function() {
    process.exit();
  });
});

module.exports = {
  getReceivedMessages: () => {
    return receivedMessages;
  }
};
