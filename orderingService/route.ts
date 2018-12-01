import OrderController from '@root/controller/order/OrderController';
const orderController = new OrderController();

module.exports = function(app) {

    app.post('/orders', orderController.createOrder);
    app.post('/orders/:orderId/pay', orderController.payOrder);
    app.post('/orders/:orderId/confirm', orderController.confirmOrder);

    app.get('/orders', orderController.getOrders);
    app.get('/orders/:orderId', orderController.getOrder);
}