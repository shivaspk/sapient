const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:29092']
})

const topic = 'test-topic'
const consumer = kafka.consumer({ groupId: 'test-group' })
const sportstopic = 'sports-topic'
const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: topic, fromBeginning: true })
  
  await consumer.subscribe({  topic: sportstopic, fromBeginning: true })
  await consumer.run({
    // eachBatch: async ({ batch }) => {
    //   console.log(batch)
    // },
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))


// const sportsconsumer = kafka.consumer({ groupId: 'sports-group' })

// const sportsrun = async () => {
//   await sportsconsumer.connect()
//   console.error("CRAP",sportstopic)
//   await sportsconsumer.subscribe({ sportstopic, fromBeginning: true })
//   await sportsconsumer.run({
//     // eachBatch: async ({ batch }) => {
//     //   console.log(batch)
//     // },
//     eachMessage: async ({ sportstopic, partition, message }) => {
//       const prefix = `${sportstopic}[${partition} | ${message.offset}] / ${message.timestamp}`
//       console.log(`- ${prefix} ${message.key}#${message.value}`)
//     },
//   })
// }

// sportsrun().catch(e => console.error(`[sports/consumer] ${e.message}`, e))