import * as kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' })
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
    client,
    [
        { topic: 'ordering', partition: 0 }
    ],
    {
        autoCommit: false
    }
);

client.connect();

client.on('ready', function (err) {
    console.log('client ready');
});

client.on('error', function (err) {
    console.log('client error', err);
});

consumer.on('message', function (message) {
    const eventPayload = JSON.parse(message.value);
    if (eventPayload.type !== 'order_paid') {
        return;
    }

    const shipment = {
        shipmentId: 1,
        orders: [
            487
        ]
    };

    const event = {
        event: 'shipment',
        type: 'shipment_created',
        ...shipment
    };

    const payload = [{
        topic: event.event,
        key: shipment.shipmentId,
        messages: JSON.stringify(event)
    }];
    producer.send(payload, (err, data) => {
        console.log('sent event', payload);
    });
});

consumer.on('error', function (err) {

    console.log('consumer error', err);
});

