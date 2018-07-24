import IOrderRepository from "domain/Order/IOrderRepository";
import Order from "domain/Order/Order";
import OrderId from "domain/Order/OrderId";

export default class OrderRepository implements IOrderRepository {
    
    getById(orderId: OrderId) : Order {
        return;
    }
}