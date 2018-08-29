import OrderController from '@root/controller/order/OrderController';
const orderController = new OrderController();

module.exports = function(app) {

    app.get('/orders', orderController.getOrders);
    app.get('/orders/:orderId', orderController.getOrder);
}