import OrderId from './OrderId';
import OrderStatus from './OrderStatus';
import LineItem from './LineItem';
import Customer from '../Customer/Customer';
import CustomerContactInfo from './CustomerContactInfo';

export default class Order {
    orderId: OrderId;
    customerContactInfo: CustomerContactInfo;
    lineItems: Array<LineItem>;
    status: Number;
    subTotal: Number;
    totalQuantity: Number;
    deliveryAddress: any;
    
    constructor(orderId: OrderId, customerContactInfo: CustomerContactInfo, lineItems: Array<LineItem>, 
        status: Number, deliveryAddress: any, subTotal?: Number, totalQuantity?: Number) {
        this.orderId = orderId;
        this.customerContactInfo = customerContactInfo;
        this.lineItems = lineItems;
        this.status = status;
        this.deliveryAddress = deliveryAddress;
        this.subTotal = subTotal;
        this.totalQuantity = totalQuantity;
    }

    addLineItem(lineItem: LineItem) {
        this.lineItems = this.lineItems || [];
        this.lineItems.push(lineItem);
    }

    calculate() {
        if (!this.lineItems.length) {
            throw new Error('there is no line items in this order');
        }

        this.subTotal = this.lineItems.reduce((a, b) => { return a + (b.quantity * b.unitPrice); }, 0);
        this.totalQuantity = this.lineItems.reduce((a, b) => { return a + b.quantity; }, 0);
    }

    pay() {
        if (this.status !== OrderStatus.PENDING) {
            throw new Error('order is not in pending status');
        }

        this.status = OrderStatus.PAID;
    }

    confirm() {
        if (this.status !== OrderStatus.PENDING && this.status !== OrderStatus.PAID) {
            throw new Error('order status is not pending or paid');
        }

        this.status = OrderStatus.CONFIRMED;
    }

    toJSON() {
        let output: any = Object.assign({}, this);
        output.orderId = output.orderId.id;
        return output;
    }
}