var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'}),
    consumer = new Consumer(
        client,
        [
            { topic: 'ordering', partition: 0 }
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
    const eventPayload = JSON.parse(message.value);
    console.log(eventPayload.type);
    if (eventPayload.type !== 'order_paid') {
        return;
    }

    console.log('issue an order shipment');
    console.log(eventPayload);
});

consumer.on('error', function (err){

    console.log('consumer error', err);
});
