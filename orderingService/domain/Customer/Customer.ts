import CustomerId from "./CustomerId";

export default class Customer {
    readonly customerId: CustomerId;
    readonly customerName: String;

    constructor(customerId: CustomerId, customerName: String) {
        this.customerId = customerId;
        this.customerName = customerName;
    }
}