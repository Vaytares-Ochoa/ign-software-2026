const assert = require("assert");

class FakeValidator {
    validate() {}
}

class FakeRepo {
    constructor() {
        this.saved = false;
    }
    save() {
        this.saved = true;
    }
}

class FakePayment {
    constructor() {
        this.called = false;
    }
    process() {
        this.called = true;
    }
}

// Test
const validator = new FakeValidator();
const repo = new FakeRepo();
const payment = new FakePayment();

const service = new (require('./refactor.js').OrderService)(
    validator,
    repo,
    payment
);

const order = { user: "Juan", total: 100 };

service.createOrder(order);

assert(repo.saved === true);
assert(payment.called === true);

console.log("✅ Test pasado");
