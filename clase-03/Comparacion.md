# Análisis de violaciones a los principios SOLID

**Clase analizada:** `OrderService`

***

## Código base

```js
class OrderService {
    constructor() {
        this.orders = [];
    }

    createOrder(order) {

        if (!order.user || !order.total) {
            throw new Error("Orden inválida");
        }

        this.orders.push(order);

        if (order.paymentType === "paypal") {
            console.log("Pagando con PayPal");
        } else if (order.paymentType === "card") {
            console.log("Pagando con tarjeta");
        }

        console.log("Enviando email");

        return order;
    }
}
```

***

# 1. Violación del **SRP (Single Responsibility Principle)**

> *Una clase debe tener una única razón para cambiar.*

## Evidencia en el código

El método `createOrder` se encarga de:

*   Validar la orden
*   Almacenar la orden
*   Procesar el pago
*   Enviar notificaciones

## Análisis

`OrderService` concentra **demasiadas responsabilidades** en una sola clase.  
Cualquier cambio en validación, pagos o notificaciones obliga a modificar esta clase, violando el principio de responsabilidad única.

✅ **Problema clave:** alta cohesión negativa y bajo mantenimiento.

***

# 2. Violación del **OCP (Open/Closed Principle)**

> *El código debe estar abierto a extensión, pero cerrado a modificación.*

## Evidencia en el código

```js
if (order.paymentType === "paypal") {
    console.log("Pagando con PayPal");
} else if (order.paymentType === "card") {
    console.log("Pagando con tarjeta");
}
```

## Análisis

El uso de condicionales dependiendo del tipo de pago obliga a **modificar el método cada vez que se agrega un nuevo medio de pago**.

✅ **Problema clave:** el sistema no puede escalar sin modificar código existente.  
Una solución adecuada sería usar polimorfismo (estrategia de pago).

***

# 3. Violación del **DIP (Dependency Inversion Principle)**

> *Los módulos de alto nivel no deben depender de detalles de implementación.*

## Evidencia en el código

```js
this.orders = [];
this.orders.push(order);
```

## Análisis

`OrderService` depende directamente de una estructura concreta (`Array`) como método de persistencia.  
No existe ninguna abstracción (repositorio o interfaz) que permita cambiar el mecanismo de almacenamiento sin alterar la clase.

✅ **Problema clave:** acoplamiento fuerte y poca flexibilidad.

***

# 4. Violación del **ISP (Interface Segregation Principle)**

> *Los clientes no deberían depender de métodos que no utilizan.*

## Evidencia conceptual

```js
class OrderService {
    createOrder(order) { ... }
}
```

## Análisis

Aunque JavaScript no exige interfaces formales, el diseño obliga a los clientes a depender de un servicio que:

*   Valida
*   Persiste
*   Cobra
*   Notifica

✅ **Problema clave:** no hay contratos específicos y bien segmentados; el servicio es demasiado general.

***

# 5. Violación del **LSP (Liskov Substitution Principle)**

> *Las subclases deben poder sustituir a la clase base sin alterar el comportamiento.*

## Evidencia conceptual

```js
if (order.paymentType === "paypal") { ... }
```

## Análisis

No existe una jerarquía de clases o abstracción para los métodos de pago.  
El comportamiento está codificado mediante condiciones, lo que impide sustituir o extender comportamientos sin modificar la lógica principal.

✅ **Problema clave:** ausencia de polimorfismo y de contratos base.

***

# Conclusión general

La clase **`OrderService` viola todos los principios SOLID**, principalmente por:

*   Acumulación de responsabilidades
*   Uso de condicionales en lugar de abstracciones
*   Dependencias concretas
*   Falta de diseño orientado a contratos

Este código es un **ejemplo claro de diseño monolítico** útil para demostrar por qué SOLID mejora la escalabilidad, mantenibilidad y claridad del software.

***
