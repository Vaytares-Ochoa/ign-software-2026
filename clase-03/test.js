const Order = require('..//models/Order');
const OrderService = require('..//OrderService');

test("crear orden correctamente", () => {
    const mockValidator = { validate: jest.fn() };
    const mockRepo = { save: jest.fn() };
    const mockPayment = { processPayment: jest.fn() };

    const service = new OrderService(mockValidator, mockRepo, mockPayment);

    const order = new Order("Juan", 100, "paypal");

    const result = service.createOrder(order);

    expect(result).toBe(order);
    expect(mockValidator.validate).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalled();
    expect(mockPayment.processPayment).toHaveBeenCalled();
});
