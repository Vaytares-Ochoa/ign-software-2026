```md
# 🛒 Sistema de E‑commerce

## 📄 Descripción del Proyecto

Este proyecto representa un sistema de comercio electrónico que permite a los clientes registrarse, buscar productos, agregarlos al carrito, realizar compras y hacer seguimiento de sus pedidos.  
Los administradores pueden gestionar productos, inventario y pedidos.  
El sistema integra pagos electrónicos y gestiona el ciclo completo de una orden.

---

## 🧩 Diagramas del Sistema

### 📘 Diagrama de Clases
diagrams.md

---

### 🔁 Diagrama de Secuencia — Realizar Compra
diagrams.md

---

### 👤 Diagrama de Casos de Uso
diagrams.md

---

## 🔄 Diagrama de Estados del Pedido

```mermaid
stateDiagram-v2
[*] --> Pending
Pending --> Shipped : Pago confirmado
Shipped --> Delivered : Pedido entregado
Delivered --> [*]
