const kafka = require('kafka-node');

const kafkaClient = new kafka.KafkaClient({
  kafkaHost: 'zkless-kafka-bootstrap:9092',
});

const kafkaProducer = new kafka.Producer(kafkaClient);

kafkaProducer.on('ready', () => {
  console.log('Kafka Producer is ready');
});

kafkaProducer.on('error', (error) => {
  console.error('Error in Kafka Producer:', error);
});

function sendMessageToKafka(topic, payload) {
  const userMessagePayload = [
    {
      topic,
      messages: JSON.stringify(payload),
    },
  ];

  return new Promise((resolve, reject) => {
    kafkaProducer.send(userMessagePayload, (error, data) => {
      if (error) {
        console.error(`Error publishing message to Kafka topic ${topic}:`, error.message);
        reject(error);
      } else {
        console.log(`Message successfully published to Kafka topic ${topic}:`, data);
        resolve(data);
      }
    });
  });
}

async function frontEndchatBot(req, res) {
  try {
    const { message, userId, userLocation } = req.body;

    console.log(`Sending message to Kafka - User ID: ${userId}, Message: ${message}`);
    await sendMessageToKafka('user_messages', { userId, message, userLocation });

    res.json({ success: true, message: 'Message sent from user to Kafka' });
  } catch (error) {
    console.error('Error in frontEndchatBot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = frontEndchatBot;
