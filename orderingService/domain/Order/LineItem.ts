export default class LineItem {
    
    readonly productId: any;
    readonly productName: string;
    readonly quantity: number;
    readonly unitPrice: number;

    constructor(productId: any, productName: string, quantity: number, unitPrice: number) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}