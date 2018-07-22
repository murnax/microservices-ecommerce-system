import * as kafka from 'kafka-node';
import * as express from 'express';

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' })
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
    client,
    [
        { topic: 'ordering', partition: 0 }
    ],
    {
        groupId: 'shipmentService',
        autoCommit: true
    }
);

const app = express();
app.post('/shipments/', (req, res) => {
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
        console.log('sent shipment.shipment_created event');
    });

    res.json('ok');
});

client.on('ready', () => {
    console.log('client ready');
});

client.on('error', function (err) {
    console.log('clieasfnt error', err);
});

consumer.on('message', message => {
    const eventPayload = JSON.parse(message.value.toString());
    if (eventPayload.type === 'order_created') {
        console.log('save order into shipment service');
        return;
    } else if (eventPayload.type === 'order_paid') {
        console.log('update order status to shippable');
        return;
    }
});

consumer.on('error', function (err) {
    console.log('consumer error', err);
});

app.listen(process.env.API_PORT, () => {
    console.log(`Rest service is now running on port ${process.env.API_PORT}`);
});