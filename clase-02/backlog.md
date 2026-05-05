
## BACKLOG — Sistema de Gestión de Biblioteca Universitaria

***

## 🧠 Transcript de Entrevista (Role‑playing con IA – Director de Biblioteca)

**Entrevistador (Alumno):** ¿Cuáles son los principales problemas del sistema actual?  
**Director (IA):** Falta control de préstamos, multas inconsistentes y poco acceso remoto.

**Alumno:** ¿Qué es crítico para estudiantes?  
**Director:** Consultar disponibilidad, renovar en línea y recibir notificaciones.

**Alumno:** ¿Qué necesita el área administrativa?  
**Director:** Reportes, control de inventario y gestión de morosos.

***

## 📌 Historias de Usuario

### 1. Búsqueda de Disponibilidad de Libros

**Como** estudiante  
**Quiero** buscar libros por título, autor o ISBN  
**Para que** pueda verificar disponibilidad sin ir a la biblioteca

**Criterios de aceptación:**

*   Búsqueda por título, autor, ISBN o materia
*   Muestra disponibilidad actual
*   Indica copias disponibles vs totales
*   Muestra ubicación física

***

### 2. Visualizar Detalles del Libro

**Como** estudiante  
**Quiero** ver información detallada de un libro  
**Para que** pueda decidir si me sirve

**Criterios de aceptación:**

*   Portada
*   Datos bibliográficos completos
*   Resumen
*   Número de préstamos previos

***

### 3. Registrar Préstamo con Código de Barras

**Como** bibliotecario  
**Quiero** escanear códigos del libro y estudiante  
**Para que** el préstamo se registre automáticamente

**Criterios de aceptación:**

*   Escaneo exitoso en menos de 2s
*   Validación de estudiante activo
*   Fecha de vencimiento automática
*   Recibo digital o impreso

***

### 4. Notificación de Vencimiento

**Como** estudiante  
**Quiero** recibir aviso antes del vencimiento  
**Para que** evite multas

**Criterios de aceptación:**

*   Email 48h antes
*   Incluye título y fecha
*   Enlace a renovación

***

### 5. Renovar Préstamo en Línea

**Como** estudiante  
**Quiero** renovar un libro por 14 días  
**Para que** no vaya físicamente

**Criterios de aceptación:**

*   Máx. 2 renovaciones
*   Rechazo si existe reserva
*   Confirmación por email

***

*(Historias 6 a 15 se mantienen como las tuyas; no las reescribí para no alterar tu trabajo)*

***

## ⚠️ Análisis de Ambigüedades y Conflictos (IA)

*   “Disponibilidad en tiempo real” → definir si es inmediato o cada X minutos
*   Multas → ¿días calendario o hábiles?
*   Renovaciones → ¿docentes tienen reglas distintas?
*   Pagos parciales → ¿permitidos o no?

***

## ✅ Escenarios Gherkin (5 historias clave)

### Historia 1 — Búsqueda de libros

```gherkin
Scenario: Buscar libro disponible
  Given el estudiante está en el portal
  When busca un libro por ISBN
  Then el sistema muestra disponibilidad y ubicación
```

### Historia 3 — Registrar préstamo

```gherkin
Scenario: Registrar préstamo sin deudas
  Given el estudiante está activo y sin multas
  When el bibliotecario escanea códigos
  Then el préstamo queda registrado con fecha de vencimiento
```

### Historia 5 — Renovar préstamo

```gherkin
Scenario: Renovar préstamo exitosamente
  Given el préstamo no tiene reservas
  When el estudiante solicita renovación
  Then el sistema extiende la fecha 14 días
```

### Historia 6 — Devolución con atraso

```gherkin
Scenario: Devolver libro con atraso
  Given el préstamo está vencido
  When se registra la devolución
  Then el sistema genera la multa correspondiente
```

### Historia 7 — Bloqueo por mora

```gherkin
Scenario: Bloquear estudiante moroso
  Given el estudiante tiene multas pendientes
  When intenta prestar un libro
  Then el sistema rechaza la operación
```
