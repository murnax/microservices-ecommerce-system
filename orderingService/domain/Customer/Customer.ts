import CustomerId from "./CustomerId";

export default class Customer {
    readonly customerId: CustomerId;
    readonly firstname: String;
    readonly lastname: String;
    readonly email: String;
    readonly phoneNumber: String;

    constructor(customerId: CustomerId, firstname: String, lastname: String, email: String) {
        this.customerId = customerId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    get fullname(): String {
        return `${this.firstname} ${this.lastname}`;
    }
}