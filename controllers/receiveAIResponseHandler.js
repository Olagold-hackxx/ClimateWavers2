const { KafkaClient, ConsumerGroup, Offset } = require('kafka-node');
const { EventEmitter } = require('events');

const kafkaClient = new KafkaClient({
  kafkaHost: 'zkless-kafka-bootstrap:9092',
});

const consumerOptions = {
  kafkaHost: 'zkless-kafka-bootstrap:9092',
  groupId: 'group_1',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
};

const consumer = new ConsumerGroup(consumerOptions, ['ai_responses']);

const aiResponseEmitter = new EventEmitter();

// Subscribe to the AI response event outside the request handler
const aiResponseListener = (aiResponse) => {
  // Log the received message for debugging
  console.log('Received AI response:', aiResponse);
  aiResponseEmitter.emit('aiResponse', aiResponse);
};

consumer.on('message', (message) => {
  // Emit the AI response event when a message is received
  const parsedMessage = JSON.parse(message.value);
  aiResponseListener(parsedMessage);
});

consumer.on('error', (error) => {
  console.error('Error in Kafka Consumer:', error);
});

async function receiveAIResponseHandler(req, res) {
  try {
    const { userId } = req.params;

    // Subscribe to the AI response event
    const aiResponseListener = (aiResponse) => {
      if (aiResponse.userId === userId) {
        // Unsubscribe from the event after receiving the expected response
        aiResponseEmitter.removeListener('aiResponse', aiResponseListener);
        res.json({ success: true, latestAIResponse: aiResponse });
      }
    };

    // Log the initiation of the listener
    console.log(`Listening for AI response for User ID: ${userId}`);

    // Listen for the AI response event
    aiResponseEmitter.on('aiResponse', aiResponseListener);
  } catch (error) {
    console.error('Error in receiveAIResponseHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = receiveAIResponseHandler;
