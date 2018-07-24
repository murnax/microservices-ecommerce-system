import IOrderRepository from "domain/Order/IOrderRepository";
import ICustomerRepository from "domain/Customer/ICustomer";

export default class OrderCommandHandlers {
    private readonly orderRepository: IOrderRepository;
    private readonly customerRepository: ICustomerRepository;

    constructor(orderRepository: IOrderRepository, customerRepository: ICustomerRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
    }

    async createOrder(command: any) {
        
    }
}