// MODELO
class Order {
    constructor(user, total) {
        this.user = user;
        this.total = total;
    }
}

// VALIDADOR (SRP)
class OrderValidator {
    validate(order) {
        if (!order.user || !order.total) {
            throw new Error("Orden inválida");
        }
    }
}

// REPOSITORY PATTERN
class OrderRepository {
    constructor() {
        this.orders = [];
    }

    save(order) {
        this.orders.push(order);
    }
}

// STRATEGY PATTERN
class PaymentStrategy {
    pay(amount) {
        throw new Error("Método no implementado");
    }
}

class PaypalPayment extends PaymentStrategy {
    pay(amount) {
        console.log("Pagando con PayPal:", amount);
    }
}

class CardPayment extends PaymentStrategy {
    pay(amount) {
        console.log("Pagando con tarjeta:", amount);
    }
}

// CONTEXTO
class PaymentService {
    constructor(strategy) {
        this.strategy = strategy;
    }

    process(amount) {
        this.strategy.pay(amount);
    }
}

// ORDER SERVICE LIMPIO
class OrderService {
    constructor(validator, repository, paymentService) {
        this.validator = validator;
        this.repository = repository;
        this.paymentService = paymentService;
    }

    createOrder(order) {
        this.validator.validate(order);
        this.repository.save(order);
        this.paymentService.process(order.total);

        console.log("Email enviado");
        return order;
    }
}

// EJECUCIÓN
const validator = new OrderValidator();
const repository = new OrderRepository();
const strategy = new PaypalPayment();
const paymentService = new PaymentService(strategy);

const service = new OrderService(validator, repository, paymentService);

const order = new Order("Juan", 100);
service.createOrder(order);
