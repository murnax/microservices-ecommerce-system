export default class LineItem {
    
    readonly productId: any;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly total: number;

    constructor(productId: any, quantity: number, unitPrice: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = quantity * unitPrice;
    }
}