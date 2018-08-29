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