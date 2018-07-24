import * as kafka from 'kafka-node';
import * as express from 'express';
import OrderCommandHandler from 'commandHandler/OrderCommandHandler';

const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
    client,
    [
        { topic: 'shipment', partition: 0 }
    ],
    {
        groupId: 'orderService',
        autoCommit: true
    }
);

const app = express();
app.get('/products', (req, res) => {
    res.json('ok');
});

app.post('/orders', (req, res) => {

    const command = {
        name: 'createOrder',
        userId: 1,
        payload: {
            lineItems: [
                { productId: 3, quantity: 5 },
                { productId: 7, quantity: 3 }
            ]
        }
    };

    const response = new OrderCommandHandler().createOrder(command);

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
        type: 'order_created',
        ...order
    };

    const payload = [{
        topic: event.event,
        key: order.orderId,
        messages: JSON.stringify(event)
    }];
    producer.send(payload, (err, data) => {
        console.log('sent ordering.order_created event');
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
        console.log('sent ordering.order_paid event');
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

app.listen(process.env.API_PORT, () => {
    console.log(`Rest service is now running on port ${process.env.API_PORT}`);
});

consumer.on('message', (message) => {
    const eventPayload = JSON.parse(message.value.toString());
    if (eventPayload.type !== 'shipment_created') {
        return;
    }

    console.log('update order status to shipping');
});