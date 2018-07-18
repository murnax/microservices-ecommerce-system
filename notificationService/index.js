var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}),
    consumer = new Consumer(
        client,
        [
            { topic: 'OrderPlaced', partition: 0 }
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
    const eventName = message.topic;
    const eventPayload = JSON.parse(message.value);

    console.log('send notification');
    console.log(eventPayload);
});

consumer.on('error', function (err){
    console.log('consumer error', err);
});
