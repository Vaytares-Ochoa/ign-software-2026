# BACKLOG - Sistema de Gestión de Préstamos - Biblioteca Central

## HISTORIAS DE USUARIO

### 1. Búsqueda de Disponibilidad de Libros
**Como** estudiante  
**Quiero** buscar un libro por título, autor o ISBN en un portal web  
**Para que** pueda verificar si está disponible sin ir a la biblioteca físicamente

**Criterios de aceptación:**
- Búsqueda por título, autor, ISBN o materia
- Muestra resultado con disponibilidad en tiempo real
- Indica número de copias disponibles vs. total
- Muestra ubicación en estanterías

---

### 2. Visualizar Detalles del Libro
**Como** estudiante  
**Quiero** ver información detallada de un libro (portada, resumen, autor, año, editorial, ISBN)  
**Para que** pueda decidir si es el recurso que necesito

**Criterios de aceptación:**
- Imagen de portada del libro
- Datos bibliográficos completos
- Resumen o descripción del contenido
- Historias de préstamos previos (solo cantidad, no datos privados)

---

### 3. Registrar Préstamo con Código de Barras
**Como** bibliotecario  
**Quiero** escanear el código de barras del libro y del carné del estudiante  
**Para que** el préstamo se registre automáticamente sin escritura manual

**Criterios de aceptación:**
- Sistema lee código de barras del libro y estudiante
- Registra automáticamente: estudiante, libro, fecha, fecha vencimiento
- Valida que el estudiante no tenga deudas pendientes
- Emite recibo impreso o digital

---

### 4. Notificación de Vencimiento de Préstamo
**Como** estudiante  
**Quiero** recibir un email 2 días antes de que venza mi préstamo  
**Para que** recuerde devolver el libro a tiempo

**Criterios de aceptación:**
- Notificación automática 48 horas antes del vencimiento
- Incluye título del libro y fecha de vencimiento
- Ofrece opción de renovar desde el email

---

### 5. Renovar Préstamo en Línea
**Como** estudiante  
**Quiero** renovar un libro por otros 14 días desde el portal web  
**Para que** no tenga que ir a la biblioteca si puedo seguir usando el libro

**Criterios de aceptación:**
- Renovación con un clic desde el portal
- Se puede renovar máximo 2 veces por préstamo
- Se valida que no haya otras reservas para ese libro
- Confirma nueva fecha de vencimiento

---

### 6. Registrar Devolución de Libro
**Como** bibliotecario  
**Quiero** escanear el código del libro devuelto para registrar su devolución  
**Para que** el sistema sepa que el libro está disponible nuevamente

**Criterios de aceptación:**
- Escaneo del código de barras registra devolución
- Sistema calcula automáticamente si hay atraso
- Genera multa automáticamente si corresponde
- Permite reportar daños en el libro

---

### 7. Generar Multa Automática por Atraso
**Como** sistema  
**Quiero** calcular automáticamente la multa cuando se devuelve un libro atrasado  
**Para que** sea consistente y justo (500 pesos/día)

**Criterios de aceptación:**
- Cálculo automático: (días de atraso × 500 pesos)
- Se registra en la cuenta del estudiante
- Bloquea nuevos préstamos hasta pagar
- Genera comprobante de multa

---

### 8. Hacer Reserva de Libro Disponible
**Como** estudiante  
**Quiero** reservar un libro que actualmente está prestado  
**Para que** reciba notificación cuando esté disponible nuevamente

**Criterios de aceptación:**
- Opción "Reservar" en la página del libro
- Crea una cola de espera ordenada por fecha de solicitud
- Envía email cuando el libro se devuelve y está disponible
- La reserva es válida por 5 días después de disponible

---

### 9. Ver Mis Préstamos Activos
**Como** estudiante  
**Quiero** ver en mi perfil todos los libros que tengo prestados actualmente  
**Para que** sepa qué tengo y cuándo vencen

**Criterios de aceptación:**
- Lista de libros prestados con portada y título
- Fecha de vencimiento de cada uno
- Contador de días que faltan
- Botón de renovación rápida

---

### 10. Ver Historial de Multas Pendientes
**Como** estudiante  
**Quiero** ver todas mis multas pendientes de pago en mi portal  
**Para que** sepa cuánto debo y pague a tiempo

**Criterios de aceptación:**
- Lista de multas con libro, fecha, monto
- Opción de pago integrada (o referencia a plataforma de pagos)
- Recibo digital después del pago
- Multa se descuenta automáticamente de la cuenta

---

### 11. Bloquear Préstamos a Estudiante Moroso
**Como** sistema  
**Quiero** que un estudiante con deudas no pueda hacer nuevos préstamos  
**Para que** se asegure el cobro de multas

**Criterios de aceptación:**
- Validación al intentar prestar: ¿tiene deudas?
- Si tiene deudas > 0, rechaza el préstamo
- Muestra mensaje informando multa pendiente
- Desbloquea automáticamente cuando paga

---

### 12. Generar Reporte de Libros No Devueltos
**Como** director  
**Quiero** generar automáticamente un reporte de libros vencidos hace más de 7 días  
**Para que** pueda contactar a estudiantes morosos

**Criterios de aceptación:**
- Reporte con: estudiante, libro, días de atraso, multa acumulada
- Opción de exportar a PDF o Excel
- Opción de generar listado para enviar emails masivos
- Actualizable en tiempo real

---

### 13. Generar Reporte de Libros Más Solicitados
**Como** director  
**Quiero** ver cuáles son los libros más prestados en el mes/semestre  
**Para que** sepa qué adquirir más o qué materiales son críticos

**Criterios de aceptación:**
- Gráfico de top 10 libros más prestados
- Filtrable por carrera, facultad o período
- Muestra tendencias (comparativa mes anterior)
- Datos de cuántos estudiantes usan cada libro

---

### 14. Integración con Sistema Académico (SIAA)
**Como** sistema  
**Quiero** verificar si un estudiante sigue activo en la universidad  
**Para que** no preste libros a estudiantes que ya se graduaron o abandonaron

**Criterios de aceptación:**
- Consulta SIAA al intentar hacer préstamo
- Rechaza si estudiante tiene estado "inactivo" o "graduado"
- Sincronización diaria de nuevos estudiantes
- Permite lista blanca de excepciones (ej: docentes)

---

### 15. Reporte de Inventario y Condición de Libros
**Como** director  
**Quiero** generar un reporte de libros con deterioro o daño reportado  
**Para que** pueda retirar materiales que estén en mal estado

**Criterios de aceptación:**
- Listado de libros reportados con daño/deterioro
- Campo de bibliotecario que reportó el daño
- Fotografía opcional del daño
- Estado: "Activo", "Dañado", "Descartado"
- Permite generar reporte para presupuesto de reemplazo

---

