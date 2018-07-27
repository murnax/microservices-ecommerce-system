import OrderId from './OrderId';
import LineItem from './LineItem';
import Customer from '../Customer/Customer';



export default class Order {
    orderId: OrderId;
    orderNumber: String;
    customer: Customer;
    lineItems: Array<LineItem>;
    status: number;
    subTotal: number;
    totalQuantity: number;
    
    constructor(orderId: OrderId, customer: Customer, lineItems: Array<LineItem>, status: number) {
        this.orderId = orderId;
        this.customer = customer;
        this.lineItems = lineItems;
        this.status = status;
        this.subTotal = lineItems.reduce((a, b) => { return a + b.total; }, 0);
        this.totalQuantity = lineItems.reduce((a, b) => { return a + b.quantity; }, 0);
    }
}