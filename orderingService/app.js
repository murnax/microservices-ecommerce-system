const kafka = require('kafka-node');
const client = new kafka.KafkaClient({
    kafkaHost: 'kafka:9092',
    requestTimeout: 2000
});
const producer = new kafka.Producer(client);

const express = require('express');
const app = express();


app.post('/orders', (req, res) => {

    // Order model should be created and returned from ordering application service
    const order = {
        orderId: 487,
        customerId: 1,
        lineItems: [
            { productId: 3, quantity: 5 },
            { productId: 7, quantity: 3 }
        ],
        subTotal: 540,
        currency: 'baht',
        status: 1,
        shippingAddress: 'somewhere on earth'
    };

    const event = {
        event: 'ordering',
        type: 'order_placed',
        ...order
    };

    const payload = [{
        topic: event.event,
        key: order.orderId,
        messages: JSON.stringify(event)
    }];
    producer.send(payload, (err, data) => {
        console.log('sent event');
    });

    res.json('how are you?');
});

app.post('/orders/:orderId/paid', (req, res) => {
    const { orderId } = req.params;

    const event = {
        event: 'ordering',
        type: 'order_paid',
        orderId
    };

    const payload = [{
        topic: event.event,
        key: orderId,
        messages: JSON.stringify(event)
    }];
    producer.send(payload, (err, data) => {
        console.log('sent event');
    });

    res.json('ok');
});

app.get('/orders', (req, res) => {
    const event = {
        type: 'OrderListed',
        userId: 3,
    };

    const payload = [{
        topic: event.type,
        messages: JSON.stringify(event)
    }];
    producer.send(payload, (err, data) => {
        console.log('err', err);
        console.log('data', data);
    });

    res.json({
        total: 0,
        data: []
    });
});

app.listen(3001, () => {
    console.log('Rest service is now running on port 3001');
});