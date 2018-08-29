namespace Services.Ordering.Queries {
    
    export interface IOrderQueryHandler {

        getOrder(orderId: any) : Promise<Order>;
        
        getOrders() : Promise<Array<Order>>;
    }
}
