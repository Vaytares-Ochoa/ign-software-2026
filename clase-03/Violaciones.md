# 1. Violación del **SRP (Single Responsibility Principle)**

> *Una clase debe tener una sola responsabilidad.*

***

## Código que genera la violación

```ts
class SistemaUniversitario {
    private estudiantes: any[] = [];
    private profesores: any[] = [];
    private cursos: any[] = [];
    private pagos: any[] = [];

    registrarEstudiante(...) { ... }
    eliminarEstudiante(...) { ... }

    registrarProfesor(...) { ... }

    crearCurso(...) { ... }
    matricularEstudiante(...) { ... }

    procesarPago(...) { ... }

    generarReporteFinanciero() { ... }
    generarReporteEstudiantes() { ... }
    generarReporteCursos() { ... }

    enviarCorreos() { ... }

    respaldarSistema() { ... }
    restaurarSistema(...) { ... }

    apagarSistema() { ... }
}
```

***

##  Por qué se produce la violación

La clase **`SistemaUniversitario`** realiza **demasiadas tareas distintas**:

*   Maneja **estudiantes**
*   Maneja **profesores**
*   Maneja **cursos**
*   Maneja **pagos**
*   Genera **reportes**
*   Envía **correos**
*   Realiza **respaldo y restauración**
*   Controla el **ciclo de vida del sistema**

Cada una de estas tareas es una razón distinta para cambiar la clase.

#  2. Violación del **OCP (Open/Closed Principle)**


> *El código debe estar abierto a extensión, pero cerrado a modificación.*

***

##  Código que genera la violación

### Ejemplo 1: método `procesarPago`

```ts
procesarPago(estudianteId: number, monto: number, metodo: string) {
    if (monto <= 0) {
        console.log("Monto inválido");
        return;
    }

    if (metodo !== "tarjeta" && metodo !== "efectivo") {
        console.log("Método no válido");
        return;
    }

    this.pagos.push({
        estudianteId,
        monto,
        metodo,
        fecha: new Date()
    });
}
```

***

##  Por qué se produce la violación

El comportamiento del sistema depende de **condicionales (`if`)**.

Si mañana se quiere:

*   agregar **PayPal**
*   agregar **transferencia**
*   agregar **pago móvil**

**Hay que modificar el método existente**, rompiendo OCP.

***

#  3. Violación del **DIP (Dependency Inversion Principle)**


> *Los módulos de alto nivel deben depender de abstracciones, no de detalles.*

***

##  Código que genera la violación

```ts
private estudiantes: any[] = [];
private pagos: any[] = [];
```

Y dentro de métodos:

```ts
this.pagos.push({
    estudianteId: estudianteId,
    monto: monto,
    metodo: metodo,
    fecha: new Date()
});
```

***

##  Por qué se produce la violación

La clase:

*   Depende directamente de **arrays concretos**
*   Usa **`any`** (sin abstracciones)
*   Maneja directamente **estructura y almacenamiento de datos**
*   No utiliza:
    *   Interfaces
    *   Inyección de dependencias
    *   Repositorios
    *   Servicios abstractos

***

