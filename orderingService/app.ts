require('module-alias/register');

const bodyParser = require('body-parser');

import * as kafka from 'kafka-node';
import * as express from 'express';
import * as mongoose from 'mongoose';
mongoose.connect('mongodb://mongo/ordering');

import OrderCommandHandler from '@root/commandHandler/OrderCommandHandler';
import OrderRepository from '@root/repository/OrderRepository';
import CustomerRepository from '@root/repository/CustomerRepository';
import ProductRepository from '@root/repository/ProductRepository';

const orderRepository = new OrderRepository();
const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const orderCommandHandler = new OrderCommandHandler(orderRepository, customerRepository, productRepository);

import OrderQueryHandler from "@root/queryHandler/OrderQueryHandler";
const orderQueryHandler = new OrderQueryHandler();

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./route')(app);

app.get('/products', (req, res) => {
    res.json('ok');
});

app.post('/orders', async (req, res) => {
    const orderDetail = req.body;
    const userId = 1;
    const command = {
        name: 'createOrder',
        payload: {
            userId,
            ...orderDetail
        }
    };

    const order = await orderCommandHandler.createOrder(command);

    const event = {
        event: 'ordering',
        type: 'order_created',
        ...order
    };

    // const payload = [{
    //     topic: event.event,
    //     key: order.orderId,
    //     messages: JSON.stringify(event)
    // }];
    // producer.send(payload, (err, data) => {
    //     console.log('sent ordering.order_created event');
    // });

    res.json(order);
});

app.post('/orders/:orderId/paid', async (req, res) => {
    const { orderId } = req.params;

    const command = {
        name: 'payOrder',
        payload: {
            userId: 1,
            orderId
        }
    };

    await orderCommandHandler.payOrder(command);

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

app.post('/orders/:orderId/confirm', async (req, res) => {
    try {
        const { orderId } = req.params;

        const command = {
            name: 'confirmOrder',
            payload: {
                userId: 1,
                orderId
            }
        };

        await orderCommandHandler.confirmOrder(command);

        const event = {
            event: 'ordering',
            type: 'order_confirmed',
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
    } catch(error) {
        res.json(error.message);
    }
    
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