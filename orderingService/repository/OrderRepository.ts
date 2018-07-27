import mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

import IOrderRepository from "domain/Order/IOrderRepository";
import Order from "domain/Order/Order";
import OrderId from "domain/Order/OrderId";

const OrderSchema = new mongoose.Schema({
    orderId: String,
    customerContactInfo: Mixed,
    lineItems: [ Mixed ],
    status: { type: Number, min: 1 },
    subTotal: { type: Number, min: 0 },
    totalQuantity: { type: Number, min: 1 },
    deliveryAddress: String
});
const OrderModel = mongoose.model('Order', OrderSchema);

export default class OrderRepository implements IOrderRepository {
    
    getById(orderId: OrderId) : Order {
        return;
    }

    create(order: Order) : void {
        try {
            console.log('save order to persistent storage.');
            new OrderModel(order.toJSON()).save()
                .then(data => {
                    console.log(data);
                });
        } catch(error) {
            console.log(error);
        }
    }
}