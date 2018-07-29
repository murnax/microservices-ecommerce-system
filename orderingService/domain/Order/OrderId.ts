export default class OrderId {
    readonly id: String

    constructor(id: String) {
        this.id = id;
    }

    toString() {
        return this.id;
    }
}