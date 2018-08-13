namespace Services.Ordering.Queries {

    export class Order {
        public orderId: string;
        public lineItems: Array<LineItem>;
        public status: number;
    }
    
    export class LineItem {
        public productId: string;
        public productName: string;
        public quantity: number;
        public unitPrice: number;
    }
}