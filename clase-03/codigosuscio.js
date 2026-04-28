class OrderService {
    constructor() {
        this.orders = [];
    }

    createOrder(order) {

        // Validación
        if (!order.user || !order.total) {
            throw new Error("Orden inválida");
        }

        // Guardar
        this.orders.push(order);

        // Pago
        if (order.paymentType === "paypal") {
            console.log("Pagando con PayPal");
        } else if (order.paymentType === "card") {
            console.log("Pagando con tarjeta");
        }

        // Email
        console.log("Enviando email");

        return order;
    }
}

module.exports = OrderService;
