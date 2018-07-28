import Order from './Order';
import OrderId from './OrderId';

export default interface IOrderRepository {
    
    getById(orderId: OrderId) : Promise<Order>;

    create(order: Order) : void;

    save(order: Order) : void;
}