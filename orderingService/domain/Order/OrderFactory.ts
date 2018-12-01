import { v4 as uuid } from 'uuid';

import Order from "./Order";
import LineItem from "./LineItem";
import OrderId from './OrderId';
import OrderStatus from './OrderStatus';
import CustomerContactInfo from './CustomerContactInfo';
import Customer from "../Customer/Customer";

export default class OrderFactory {

    static create(customer: Customer, lineItems: Array<LineItem>, deliveryAddress: String) : Order {
        const orderId = new OrderId(uuid());
        const customerContactInfo = new CustomerContactInfo(`${customer.firstname} ${customer.lastname}`, customer.email, customer.phoneNumber);
        const order = new Order(orderId, customerContactInfo, lineItems, OrderStatus.PENDING, deliveryAddress);
        order.calculate();
        return order;
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