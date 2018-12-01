import mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

import IOrderRepository from "@root/domain/Order/IOrderRepository";
import Order from "@root/domain/Order/Order";
import OrderId from "@root/domain/Order/OrderId";

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
    
    async getById(orderId: OrderId) : Promise<Object> {
        const order = await OrderModel.findOne({ orderId })
        if (!order) {
            return null;
        }
        return order;
    }

    create(order: Order) {
        new OrderModel(order.toJSON()).save();
    }

    save(order: Order) : void {
        OrderModel.findOneAndUpdate({ orderId: order.orderId.toString() }, { $set: order.toJSON() }).exec();
    }
}