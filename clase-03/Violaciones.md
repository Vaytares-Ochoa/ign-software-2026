#  VIOLACIONES SOLID (FORMATO QUE TE PIDEN)

---

# 1. Violación del **SRP (Single Responsibility Principle)**

> *Una clase debe tener una sola responsabilidad.*

---

## Código que genera la violación

```js
createOrder(order) {

    if (!order.user || !order.total) {
        throw new Error("Orden inválida");
    }

    this.orders.push(order);

    if (order.paymentType === "paypal") {
        console.log("Pagando con PayPal");
    }

    console.log("Enviando email");
}
```

---

## Por qué se produce la violación

La clase **`OrderService`** realiza múltiples responsabilidades:

* Validación de datos
* Almacenamiento de órdenes
* Procesamiento de pagos
* Envío de notificaciones

Cada una de estas acciones debería estar en clases separadas.

---

# 2. Violación del **OCP (Open/Closed Principle)**

> *El código debe estar abierto a extensión, pero cerrado a modificación.*

---

## Código que genera la violación

```js
if (order.paymentType === "paypal") {
    console.log("Pagando con PayPal");
} else if (order.paymentType === "card") {
    console.log("Pagando con tarjeta");
}
```

---

## Por qué se produce la violación

El sistema depende de **condicionales (`if`)**.

Si se desea agregar nuevos métodos de pago como:

* Transferencia
* Criptomonedas
* Pago móvil

Se debe modificar el código existente, rompiendo el principio OCP.

---

# 3. Violación del **DIP (Dependency Inversion Principle)**

> *Los módulos de alto nivel deben depender de abstracciones.*

---

## Código que genera la violación

```js
this.orders = [];

this.orders.push(order);
```

---

## Por qué se produce la violación

La clase depende directamente de:

* Un array concreto (`[]`)
* No usa abstracciones
* No hay repositorios ni interfaces

Esto hace difícil cambiar la forma de almacenamiento (por ejemplo, base de datos).

---

# 4. Violación del **ISP (Interface Segregation Principle)**

> *Los clientes no deben depender de métodos que no usan.*

---

## Código que genera la violación

```js
class OrderService {
    createOrder(order) { ... }
}
```

---

## Por qué se produce la violación

No hay separación de responsabilidades en interfaces.

El servicio obliga a manejar:

* Validación
* Pagos
* Persistencia

Todo en un solo punto.

---

# 5. Violación del **LSP (Liskov Substitution Principle)**

> *Las clases derivadas deben poder sustituir a sus clases base.*

---

## Código que genera la violación

```js
if (order.paymentType === "paypal") {
    console.log("Pagando con PayPal");
}
```

---

## Por qué se produce la violación

No existe una jerarquía de clases para pagos.

No se pueden sustituir comportamientos fácilmente porque todo está basado en condicionales.
