# Sistema de E-commerce

## Descripción en Prosa

El Sistema de E-commerce es una plataforma digital que facilita la compra y venta de productos en línea. El sistema está compuesto por varios componentes clave que trabajan de manera integrada:

**Cliente/Usuario**: Es la persona que accede a la plataforma a través de una interfaz web o aplicación móvil para navegar, buscar y comprar productos. El usuario puede crear una cuenta, ver su historial de pedidos y gestionar su perfil.

**Catálogo de Productos**: Contiene el inventario disponible de artículos. Cada producto tiene información detallada como nombre, descripción, precio, imágenes, disponibilidad y valoraciones de otros usuarios. El sistema permite filtrar y buscar productos según criterios específicos.

**Carrito de Compras**: Un componente temporal donde los usuarios pueden agregar productos antes de finalizar la compra. Los usuarios pueden modificar cantidades, eliminar artículos o aplicar códigos de descuento.

**Sistema de Pago**: Procesa las transacciones de forma segura. Integra múltiples métodos de pago (tarjetas de crédito, billeteras digitales, transferencias bancarias) y valida las operaciones. Se comunica con pasarelas de pago externas.

**Gestión de Pedidos**: Registra todas las compras, mantiene el estado de cada pedido (pendiente, confirmado, enviado, entregado) y genera números de seguimiento para que los usuarios puedan monitorear sus envíos.

**Inventario**: Controla el stock de productos, actualiza disponibilidades en tiempo real y notifica cuando un producto está bajo en existencias o agotado.

**Sistema de Usuarios**: Gestiona la autenticación, autorización y perfiles de clientes. Almacena información personal, direcciones de envío y preferencias de compra.

**Notificaciones**: Envía confirmaciones de pedidos, actualizaciones de estado de envío, ofertas personalizadas y recordatorios a través de email o SMS.

**Reseñas y Calificaciones**: Permite a los usuarios calificar productos y dejar comentarios, lo que ayuda a otros clientes en su proceso de decisión de compra.

---

## Diagrama PlantUML

graph TB
    UI["Interfaz Web/App"]
    
    USERS["Sistema de Usuarios"]
    CATALOG["Catálogo de Productos"]
    CART["Carrito de Compras"]
    ORDERS["Gestión de Pedidos"]
    NOTIF["Sistema de Notificaciones"]
    
    DB["Base de Datos"]
    CACHE["Caché"]
    
    PAYMENT["Pasarela de Pago"]
    SHIPPING["Servicio de Envíos"]
    EMAIL["Servicio de Email/SMS"]
    
    INVENTORY["Inventario"]
    REVIEWS["Reseñas y Calificaciones"]
    
    UI --> USERS
    UI --> CATALOG
    UI --> CART
    UI --> ORDERS
    UI --> REVIEWS
    
    USERS --> DB
    CATALOG --> DB
    CATALOG --> CACHE
    CART --> INVENTORY
    CART --> DB
    ORDERS --> DB
    ORDERS --> NOTIF
    INVENTORY --> DB
    REVIEWS --> DB
    
    CART --> PAYMENT
    PAYMENT --> ORDERS
    ORDERS --> SHIPPING
    SHIPPING --> NOTIF
    NOTIF --> EMAIL
    NOTIF --> EMAIL
```
