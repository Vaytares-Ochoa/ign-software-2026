# Sistema de E-commerce

## Descripción del Sistema

Un sistema de e‑commerce es una plataforma digital que permite la compra y venta de productos o servicios a través de Internet. El sistema está compuesto por varios módulos que trabajan de forma integrada para ofrecer una experiencia eficiente tanto al cliente como al administrador.

El cliente puede registrarse o iniciar sesión en la plataforma, navegar por el catálogo de productos, consultar precios y descripciones, y agregar productos al carrito de compras. Al finalizar la selección, el sistema gestiona el proceso de pago mediante una pasarela segura y, si el pago es exitoso, se genera un pedido.

El administrador del sistema cuenta con un panel administrativo desde el cual puede gestionar productos, inventario, pedidos, usuarios y revisar reportes de ventas. Toda la información se almacena en una base de datos central que garantiza la integridad y disponibilidad de los datos.

## Diagrama del Sistema de E‑commerce

```mermaid
flowchart TD
    Usuario[Cliente] -->|Navega y selecciona| Frontend[Interfaz Web / App]
    Frontend -->|Solicitudes| Backend[Servidor / Lógica del Negocio]

    Backend --> Catalogo[Módulo de Catálogo]
    Backend --> Carrito[Módulo de Carrito]
    Backend --> Pedidos[Módulo de Pedidos]
    Backend --> Pagos[Módulo de Pagos]

    Pagos -->|Validación| Pasarela[Pasarela de Pago]
    Pasarela -->|Confirmación| Pagos

    Backend --> Inventario[Módulo de Inventario]
    Backend --> BD[(Base de Datos)]

    Administrador[Administrador] -->|Gestiona| PanelAdmin[Panel Administrativo]
    PanelAdmin --> Backend

    Inventario --> BD
    Catalogo --> BD
    Pedidos --> BD
    Carrito --> BD
