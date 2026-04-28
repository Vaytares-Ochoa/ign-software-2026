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

```plantuml
@startuml
!define RECTANGLE_BG #E1F5FF
!define PROCESS_BG #FFF9C4
!define STORAGE_BG #F3E5F5
!define EXTERNAL_BG #E8F5E9

skinparam backgroundColor #FFFFFF
skinparam rectangle {
  BackgroundColor RECTANGLE_BG
  BorderColor #0288D1
  FontColor #01579B
}

package "Cliente" {
  rectangle "Interfaz Web/App" as UI #E1F5FF
}

package "Plataforma E-commerce" {
  rectangle "Sistema de Usuarios" as USERS #PROCESS_BG
  rectangle "Catálogo de Productos" as CATALOG #PROCESS_BG
  rectangle "Carrito de Compras" as CART #PROCESS_BG
  rectangle "Gestión de Pedidos" as ORDERS #PROCESS_BG
  rectangle "Sistema de Notificaciones" as NOTIF #PROCESS_BG
}

package "Almacenamiento" {
  rectangle "Base de Datos\n(Usuarios, Productos,\nPedidos)" as DB #F3E5F5
  rectangle "Caché\n(Catálogo, Sesiones)" as CACHE #F3E5F5
}

package "Servicios Externos" {
  rectangle "Pasarela de Pago" as PAYMENT #E8F5E9
  rectangle "Servicio de Envíos" as SHIPPING #E8F5E9
  rectangle "Servicio de Email/SMS" as EMAIL #E8F5E9
}

package "Sistema Interno" {
  rectangle "Inventario" as INVENTORY #PROCESS_BG
  rectangle "Reseñas y\nCalificaciones" as REVIEWS #PROCESS_BG
}

' Conexiones desde UI
UI --> USERS : Login/Registro
UI --> CATALOG : Buscar/Navegar
UI --> CART : Agregar/Ver Carrito
UI --> ORDERS : Ver Pedidos
UI --> REVIEWS : Calificar/Reseñar

' Conexiones internas
USERS --> DB : Guardar/Recuperar
CATALOG --> DB : Consultar Productos
CATALOG --> CACHE : Caché de Datos
CART --> INVENTORY : Verificar Disponibilidad
CART --> DB : Guardar Carrito
ORDERS --> DB : Guardar/Actualizar
ORDERS --> NOTIF : Notificar Estado
INVENTORY --> DB : Actualizar Stock
REVIEWS --> DB : Guardar Reseñas

' Conexiones con Servicios Externos
CART --> PAYMENT : Procesar Pago
PAYMENT --> ORDERS : Confirmar Transacción
ORDERS --> SHIPPING : Crear Envío
SHIPPING --> NOTIF : Estado de Envío
NOTIF --> EMAIL : Enviar Notificaciones

@enduml
```
