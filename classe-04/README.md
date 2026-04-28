# 📦 Diagrama de Estados del Pedido

Este diagrama representa el ciclo de vida de un pedido dentro de un sistema de E‑commerce, desde que se crea hasta que es entregado al cliente.

Estados incluidos:
- **Pending**: El pedido ha sido creado y está pendiente de procesamiento.
- **Shipped**: El pedido ha sido enviado al cliente.
- **Delivered**: El pedido ha sido entregado exitosamente.

El diagrama está implementado utilizando **Mermaid**, por lo que se renderiza automáticamente como imagen en GitHub.

---

## 🔁 Diagrama de Estados – Pedido

```mermaid
stateDiagram-v2
    [*] --> Pending

    Pending --> Shipped : Pago confirmado
    Shipped --> Delivered : Pedido entregado

    Delivered --> [*]
