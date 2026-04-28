# 🛒 Sistema de E‑commerce

Este proyecto representa un **Sistema de E‑commerce** modelado mediante diagramas UML utilizando **Mermaid**, los cuales semaidEste proyecto representa un **Sistema de E‑commerce** modelado mediante diagramas UML utilizando **Mermaid**, los cuales se renderizan automáticamente como imágenes en este README.
classDiagram
    Usuario <|-- Cliente
    Usuario <|-- Administrador

    Cliente "1" --> "1" Carrito
    Cliente "1" --> "0..*" Pedido
    Carrito "1" --> "1..*" ItemCarrito
    ItemCarrito "*" --> "1" Producto
    Pedido "1" --> "1..*" DetallePedido
    DetallePedido "*" --> "1" Producto
    Pedido "1" --> "1" Pago
    Pedido "1" --> "1" Envio

    class Usuario {
        id
        nombre
        email
        password
    }

    class Cliente {
        realizarCompra()
        consultarPedido()
    }

    class Administrador {
        gestionarProductos()
        gestionarPedidos()
    }

    class Producto {
        id
        nombre
        precio
        stock
    }

    class Carrito {
        id
        calcularTotal()
    }

    class ItemCarrito {
        cantidad
        subtotal()
    }

    class Pedido {
        id
        fecha
        estado
    }

    class DetallePedido {
        cantidad
        precioUnitario
    }

    class Pago {
        metodo
        estado
        procesarPago()
    }

    class Envio {
        direccion
        estado
    }

---

## 📌 Diagrama de Clases

