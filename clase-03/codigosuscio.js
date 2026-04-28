class OrderService {
    constructor() {
        this.orders = [];
    }

    createOrder(order) {
        // Validación
        if (!order.user || !order.total) {
            throw new Error("Orden inválida");
        }

        // Guardar en "DB"
        this.orders.push(order);

        // Procesar pago
        if (order.paymentType === "paypal") {
            console.log("Procesando pago con PayPal");
        } else if (order.paymentType === "credit") {
            console.log("Procesando pago con tarjeta");
        }

        // Enviar email
        console.log("Enviando email al usuario");

        return order;
    }
}

module.exports = OrderService;
