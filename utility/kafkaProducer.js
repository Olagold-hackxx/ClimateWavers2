const kafka = require('kafka-node');

const user = new kafka.KafkaClient({
  kafkaHost: 'zkless-kafka-bootstrap:9092'
});

const producer = new kafka.Producer(user);

console.log('I am waiting to send message');

producer.on('ready', () => {
  const userId = 5; 
  const userLocation = {
    latitude: 40.7128, 
    longitude: -74.0060 
  };

  const message = {
    userId: userId,
    message: 'What is climate?', 
    userLocation: userLocation 
  };

  const payload = [
    {
      topic: 'user_messages',
      messages: JSON.stringify(message)
    }
  ];

  producer.send(payload, (error, data) => {
    if (error) {
      console.error('Error in publishing message:', error);
    } else {
      console.log('Message successfully published:', data);
    }
  });
});

producer.on('error', (error) => {
  console.error('Error connecting to Kafka:', error);
});
