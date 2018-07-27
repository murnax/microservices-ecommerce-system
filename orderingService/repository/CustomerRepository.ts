import ICustomerRepository from "domain/Customer/ICustomer";
import CustomerId from "domain/Customer/CustomerId";
import Customer from "domain/Customer/Customer";

export default class CustomerRepository implements ICustomerRepository {
    
    getById(customerId: CustomerId) : any {
        return {
            userId: 1,
            firstname: 'Suratin',
            lastname: 'Pattanawongthai',
            email: 'suratin.elec@gmail.com',
            phoneNumber: '0833154939',
            gender: 'M',
            dateOfBirth: '04/09/1990'
        };
    }
}