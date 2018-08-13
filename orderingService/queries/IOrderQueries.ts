namespace Services.Ordering.Queries {
    
    export interface IOrderQueries {

        getOrder(orderId: any) : Promise<Order>;
        
        getOrders() : Promise<Array<Order>>;
    }
}
