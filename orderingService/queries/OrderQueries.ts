import mongoose = require('mongoose');
const OrderModel = mongoose.model('Order');

class Order {
    public orderId: string;
    public lineItems: Array<LineItem>;
    public status: number;

}

class LineItem {
    public productId: string;
    public productName: string;
    public quantity: number;
    public unitPrice: number;
}

class OrderSummary {
    public orderId: string;
    public status: number;
    public subTotal: number;
    public totalQuantity: number;

    constructor(orderId: string, status: number, subTotal: number, totalQuantity: number) {
        this.orderId = orderId;
        this.status = status;
        this.subTotal = subTotal;
        this.totalQuantity = totalQuantity;
    }
}

export default class OrderQueries {

    async getOrder(orderId: any): Promise<Order> {
        const order = await OrderModel.findOne({ orderId });
        return order;
        // return new Order(order);
    }

    async getOrders() : Promise<Array<OrderSummary>> {
        return (await OrderModel.find()).map(order => {
            return new OrderSummary(order.orderId, order.status, order.subTotal, order.totalQuantity);
        });
    }
}
