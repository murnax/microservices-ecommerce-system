import IOrderRepository from "domain/Order/IOrderRepository";
import ICustomerRepository from "domain/Customer/ICustomer";
import ProductRepository from "repository/ProductRepository";

export default class OrderCommandHandlers {
    private readonly orderRepository: IOrderRepository;
    private readonly customerRepository: ICustomerRepository;
    private readonly productRepository: ProductRepository;

    constructor(orderRepository: IOrderRepository, customerRepository: ICustomerRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    async createOrder(command: any) {
        const { userId, payload: lineItems } = command;
        const customer = await this.customerRepository.getById(userId);
        const products = await this.productRepository.getProductsByIDs(lineItems.map((item: any) => item.productId));

        // const products = await this.
    }
}