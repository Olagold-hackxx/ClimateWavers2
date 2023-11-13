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

const consumerOptions = {
  kafkaHost: 'zkless-kafka-bootstrap:9092',
  groupId: 'group_1',
  autoCommit: true,
  autoCommitIntervalMs: 5000,
};

const consumer = new kafka.ConsumerGroup(consumerOptions, ['ai_responses']);

console.log('Kafka consumer is listening for messages...');

consumer.on('error', (err) => {
  console.error('Error:', err);
});

process.on('SIGINT', async () => {
  await closeConsumer();
  process.exit();
});

function closeConsumer() {
  return new Promise((resolve) => {
    consumer.close(true, resolve);
  });
}

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
        console.error(`Error publishing message to Kafka topic ${topic}:`, error);
        reject(error);
      } else {
        console.log(`Message successfully published to Kafka topic ${topic}:`, data);
        resolve(data);
      }
    });
  });
}

async function receiveAIResponse(userId) {
  return new Promise((resolve, reject) => {
    const aiResponsePayload = [
      {
        topic: 'ai_responses',
        offset: 0,
        partition: 0,
        maxNum: 1,
      },
    ];

    kafkaClient.loadMetadataForTopics(['ai_responses'], (error) => {
      if (error) {
        console.error('Error loading metadata for topics:', error);
        reject(error);
        return;
      }

      kafkaClient.fetchOffsets(aiResponsePayload, (error, data) => {
        if (error) {
          console.error('Error fetching offset for AI response:', error);
          reject(error);
        } else {
          const latestOffset = data['ai_responses'][0]['0'][0];
          const aiResponseOptions = {
            topic: 'ai_responses',
            partition: 0,
            offset: latestOffset,
            maxBytes: 1024 * 1024,
          };

          const aiResponseStream = kafkaClient.getOffsetStream(aiResponseOptions);
          const messages = [];

          aiResponseStream.on('data', (message) => {
            messages.push(message.value);
          });

          aiResponseStream.on('end', () => {
            const latestAIResponse = messages.length > 0 ? JSON.parse(messages[0]) : null;
            resolve(latestAIResponse);
          });

          aiResponseStream.on('error', (error) => {
            console.error('Error streaming AI response:', error);
            reject(error);
          });
        }
      });
    });
  });
}

async function receiveAIResponseHandler(req, res) {
  try {
    const { userId } = req.params;

    const latestAIResponse = await receiveAIResponse(userId);

    res.json({ success: true, latestAIResponse });
  } catch (error) {
    console.error('Error in receiveAIResponseHandler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function frontEndchatBot(req, res) {
  try {
    const { message, userId, userLocation } = req.body;

    await sendMessageToKafka('user_messages', { userId, message, userLocation });

    res.json({ success: true, message: 'Message sent from user to Kafka' });
  } catch (error) {
    console.error('Error in frontEndchatBot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { frontEndchatBot, receiveAIResponseHandler };
