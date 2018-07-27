import Order from './Order';
import OrderId from './OrderId';

export default interface IOrderRepository {
    
    getById(orderId: OrderId) : Order;

    create(order: Order) : void;
}