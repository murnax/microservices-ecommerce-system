import { v4 as uuid } from 'uuid';

import IOrderRepository from "domain/Order/IOrderRepository";
import ICustomerRepository from "domain/Customer/ICustomer";
import ProductRepository from "repository/ProductRepository";
import Order from "@root/domain/Order/Order";
import LineItem from "@root/domain/Order/LineItem";
import OrderId from '@root/domain/Order/OrderId';
import OrderStatus from '@root/domain/Order/OrderStatus';
import CustomerContactInfo from '@root/domain/Order/CustomerContactInfo';

export default class OrderCommandHandlers {
    private readonly orderRepository: IOrderRepository;
    private readonly customerRepository: ICustomerRepository;
    private readonly productRepository: ProductRepository;

    constructor(orderRepository: IOrderRepository, customerRepository: ICustomerRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    async createOrder({ payload }: any) {
        try {
            const { userId, orderList, deliveryAddress } = payload;

            const customer = await this.customerRepository.getById(userId);
            if (!customer) {

            }

            const products = await this.productRepository.getProductsByIDs(orderList.map((item: any) => item.productId));
            const lineItems: Array<LineItem> = products.map((product: any, index: number) => {
                return new LineItem(product.productId, orderList[index].quantity, product.unitPrice);
            });

            const fullname = `${customer.firstname} ${customer.lastname}`;
            const customerContactInfo = new CustomerContactInfo(fullname, customer.email, customer.phoneNumber);

            const orderId = new OrderId(uuid());
            const order = new Order(orderId, customerContactInfo, lineItems, OrderStatus.PENDING, deliveryAddress);
            this.orderRepository.create(order);
            return order;
        } catch (error) {
            console.log(error);
        }
    }

    async paidOrder(command: any) {
        try {
            const { userId, payload: { orderId } } = command;
            
        } catch (error) {
            console.log(error);
        }
    }
}