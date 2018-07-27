export default class CustomerContactInfo {
    
    fullname: String;
    email: String;
    phoneNumber: String;

    constructor(fullname: String, email: String, phoneNumber: String) {
        this.fullname = fullname;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
