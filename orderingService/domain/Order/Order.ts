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

    calculate() {
        this.subTotal = this.lineItems.reduce((a, b) => { return a + b.total; }, 0);
        this.totalQuantity = this.lineItems.reduce((a, b) => { return a + b.quantity; }, 0);
    }

    pay() {
        if (this.status !== OrderStatus.PENDING) {
            // throw error
        }
        this.status = OrderStatus.PAID;
    }

    toJSON() {
        let output: any = Object.assign({}, this);
        output.orderId = output.orderId.id;
        return output;
    }
}