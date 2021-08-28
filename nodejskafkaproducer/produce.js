const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:29092']
})

const producer = kafka.producer()

const run = async () => {
    await producer.connect()
    setInterval(sendMessage, 3000)
  }

  run().catch(e => console.error(`[example/producer] ${e.message}`, e))

  const run1 = async () => {
    await producer.connect()
    setInterval(sendSportsMessage, 10000)
  }

  run1().catch(e => console.error(`[example/producer] ${e.message}`, e))

const sendMessage = () => {
    return producer.send({
        topic: 'test-topic',
        messages: [
          { value: 'Hello KafkaJS user!' },
        ],
      })
      .then(console.log)
      .catch(e => console.error(`[example/producer] ${e.message}`, e))
  }

  const sendSportsMessage = () => {
    return producer.send({
        topic: 'sports-topic',
        messages: [
          { value: 'Hello Sports Tipic user!' },
        ],
      })
      .then(console.log)
      .catch(e => console.error(`[sports/producer] ${e.message}`, e))
  }
