import OrderId from './OrderId';
import LineItem from './LineItem';
import Customer from '../Customer/Customer';

export default class Order {
    orderId: OrderId;
    customer: Customer;
    lineItems: Array<LineItem>;
    
    constructor(orderId: OrderId, customer: Customer, lineItems: Array<LineItem>) {
        this.orderId = orderId;
        this.customer = customer;
        this.lineItems = lineItems;
    }
}