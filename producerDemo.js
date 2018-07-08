// 'use strict';
// const kafka = require('kafka-node');

// try {
//     const Producer = kafka.Producer;
//     const client = new kafka.KafkaClient({
//         kafkaHost: '127.0.0.1:9092',
//         requestTimeout: 2000
//     });
//     // const client = new kafka.Client('kafka:2181', 'test')
//     const producer = new Producer(client);
//     const topic = 'test_topic' 
//     const payloads = [
//         { topic, messages: 'Hmmmmmmmm?', partition: 0 }
//     ]

//     client.on('ready', function (){
//         console.log('client ready');
//     })  

//     client.on('error', function (err){
//         console.log('client error: ' + err);
//     });

//     producer.on('ready', function() {
//         console.log('connected to kafka.');

//         producer.send(payloads, function(err, data) {
//             console.log('error', err);
//             console.log('data', data);
//         });
//     });
//     producer.on('error', function(error) {
//         console.log(error);
//     });
// } catch(error) {
//     console.log(error);
// }
