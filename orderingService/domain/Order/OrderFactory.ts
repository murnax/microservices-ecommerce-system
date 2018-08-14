import Order from "./Order";
import LineItem from "./LineItem";
import OrderId from './OrderId';
import OrderStatus from './OrderStatus';
import CustomerContactInfo from './CustomerContactInfo';

export default class OrderFactory {

    constructor() {

    }

    create() : Order {
        return;
    }

    static reconstitute(rawOrder: any) : Order {
        const orderId = new OrderId(rawOrder.orderId);

        const { fullname, email, phoneNumber } = rawOrder.customerContactInfo;
        const customerContactInfo = new CustomerContactInfo(fullname, email, phoneNumber);
        
        const lineItems: Array<LineItem> = rawOrder.lineItems.map((lineItem: any, index: number) => {
            return new LineItem(lineItem.productId, lineItem.quantity, lineItem.unitPrice);
        });
        
        const order = new Order(orderId, customerContactInfo, lineItems, rawOrder.status, rawOrder.deliveryAddress, rawOrder.subTotal, rawOrder.totalQuantity);
        return order;
    }
} 