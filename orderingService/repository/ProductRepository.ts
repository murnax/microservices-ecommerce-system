export default class ProductRepository {

    async getProductsByIDs(productIDs: Array<any>) : Promise<any> {
        return [
            {
                productId: 3,
                unitPrice: 200
            },
            {
                productId: 7,
                unitPrice: 450
            }
        ];
    }
}