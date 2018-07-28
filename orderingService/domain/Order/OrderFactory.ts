import Order from "@root/domain/Order/Order";
import LineItem from "@root/domain/Order/LineItem";
import OrderId from '@root/domain/Order/OrderId';
import OrderStatus from '@root/domain/Order/OrderStatus';
import CustomerContactInfo from '@root/domain/Order/CustomerContactInfo';

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