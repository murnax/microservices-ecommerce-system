import mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;

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

export default class OrderRepository {

    create(order: any) {
        new OrderModel(order.toJSON()).save();
    }
}