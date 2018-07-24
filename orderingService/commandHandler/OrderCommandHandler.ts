import IOrderRepository from "domain/Order/IOrderRepository";

export default class OrderCommandHandlers {
    private readonly orderRepository: IOrderRepository;

    constructor() {

    }

    async createOrder({ userId, payload }) {
        
    }
}