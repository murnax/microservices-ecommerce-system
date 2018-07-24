import Customer from './Customer';
import CustomerId from "./CustomerId";

export default interface ICustomerRepository {
    
    getById(customerId: CustomerId) : Customer;
}