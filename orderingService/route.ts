import OrderController from 'controller/order/OrderController';
const orderController = new OrderController();

module.exports = function(app) {

    app.get('/orders', orderController.getOrders);
}