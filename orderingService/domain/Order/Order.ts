import OrderId from './OrderId';
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
    
    constructor(orderId: OrderId, customerContactInfo: CustomerContactInfo, lineItems: Array<LineItem>, status: Number, deliveryAddress: any) {
        this.orderId = orderId;
        this.customerContactInfo = customerContactInfo;
        this.lineItems = lineItems;
        this.status = status;
        this.subTotal = lineItems.reduce((a, b) => { return a + b.total; }, 0);
        this.totalQuantity = lineItems.reduce((a, b) => { return a + b.quantity; }, 0);
        this.deliveryAddress = deliveryAddress;
    }

    toJSON() {
        let output = Object.assign({}, this);
        output.orderId = output.orderId.id;
        return output;
    }
}