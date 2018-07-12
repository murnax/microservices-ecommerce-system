var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}),
    consumer = new Consumer(
        client,
        [
            { topic: 'test_topic', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
    client.connect();
    
    client.on('ready', function (err){
        console.log('client ready');
    });

    client.on('error', function (err){
        console.log('client error', err);
    });

consumer.on('message', function (message) {
    console.log(message);
});

consumer.on('error', function (err){
    console.log('consumer error', err);
});
