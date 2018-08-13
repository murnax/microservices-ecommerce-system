export default class ProductRepository {

    async getProductsByIDs(productIDs: Array<any>) : Promise<any> {
        return [
            {
                productId: 3,
                productName: "Product A",
                unitPrice: 200
            },
            {
                productId: 7,
                productName: "Product B",
                unitPrice: 450
            }
        ];
    }
}