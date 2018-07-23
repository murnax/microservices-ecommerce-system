import IOrderRepository from "domain/Order/IOrderRepository";

export default class OrderCommandHandlers {
    private readonly orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {

    }

    async createOrder() {
        
    }
}