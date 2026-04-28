
# 📝 CÓDIGOS SOLID: Violaciones vs Soluciones

# ✅ 1. SRP - Single Responsibility Principle

## El Problema

```typescript
// ❌ UNA CLASE CON 8+ RESPONSABILIDADES
class SistemaUniversitario {
    // Responsabilidad 1: Gestión de estudiantes
    // Responsabilidad 2: Gestión de profesores
    // Responsabilidad 3: Gestión de cursos
    // Responsabilidad 4: Gestión de pagos
    // Responsabilidad 5: Generación de reportes
    // ... y más
}
```

## La Solución

### 1.1 Modelos de Datos

```typescript
// ===== MODELOS =====
interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
    carrera: string;
    activo: boolean;
}

interface Profesor {
    id: number;
    nombre: string;
    salario: number;
}

interface Curso {
    codigo: string;
    nombre: string;
    profesorId: number;
    estudiantes: number[];
}

interface Pago {
    id?: number;
    estudianteId: number;
    monto: number;
    metodo: string;
    fecha: Date;
}
```

### 1.2 Repositorios (Abstracción de Datos)

```typescript
// ===== REPOSITORIOS: Interface para acceso a datos =====
interface RepositorioEstudiante {
    agregar(estudiante: Estudiante): void;
    eliminar(id: number): boolean;
    obtener(id: number): Estudiante | null;
    obtenerTodos(): Estudiante[];
}

interface RepositorioProfesor {
    agregar(profesor: Profesor): void;
    obtener(id: number): Profesor | null;
    obtenerTodos(): Profesor[];
}

interface RepositorioCurso {
    agregar(curso: Curso): void;
    obtener(codigo: string): Curso | null;
    obtenerTodos(): Curso[];
}

interface RepositorioPago {
    agregar(pago: Pago): void;
    obtenerPorEstudiante(estudianteId: number): Pago[];
    obtenerTodos(): Pago[];
}
```

### 1.3 Implementación: Repositorio en Array

```typescript
// ===== IMPLEMENTACIÓN: Repositorios con Array =====

class RepositorioEstudianteArray implements RepositorioEstudiante {
    private estudiantes: Estudiante[] = [];
    private idCounter = 1;

    agregar(estudiante: Estudiante): void {
        if (!estudiante.id) {
            estudiante.id = this.idCounter++;
        }
        this.estudiantes.push(estudiante);
    }

    eliminar(id: number): boolean {
        const index = this.estudiantes.findIndex(e => e.id === id);
        if (index !== -1) {
            this.estudiantes.splice(index, 1);
            return true;
        }
        return false;
    }

    obtener(id: number): Estudiante | null {
        return this.estudiantes.find(e => e.id === id) || null;
    }

    obtenerTodos(): Estudiante[] {
        return [...this.estudiantes];
    }
}

class RepositorioPagoArray implements RepositorioPago {
    private pagos: Pago[] = [];
    private idCounter = 1;

    agregar(pago: Pago): void {
        if (!pago.id) {
            pago.id = this.idCounter++;
        }
        this.pagos.push(pago);
    }

    obtenerPorEstudiante(estudianteId: number): Pago[] {
        return this.pagos.filter(p => p.estudianteId === estudianteId);
    }

    obtenerTodos(): Pago[] {
        return [...this.pagos];
    }
}

class RepositorioCursoArray implements RepositorioCurso {
    private cursos: Curso[] = [];

    agregar(curso: Curso): void {
        this.cursos.push(curso);
    }

    obtener(codigo: string): Curso | null {
        return this.cursos.find(c => c.codigo === codigo) || null;
    }

    obtenerTodos(): Curso[] {
        return [...this.cursos];
    }
}

class RepositorioProfesorArray implements RepositorioProfesor {
    private profesores: Profesor[] = [];
    private idCounter = 1;

    agregar(profesor: Profesor): void {
        if (!profesor.id) {
            profesor.id = this.idCounter++;
        }
        this.profesores.push(profesor);
    }

    obtener(id: number): Profesor | null {
        return this.profesores.find(p => p.id === id) || null;
    }

    obtenerTodos(): Profesor[] {
        return [...this.profesores];
    }
}
```

### 1.4 Servicio 1: Solo Estudiantes (SRP)

```typescript
// ===== SERVICIO 1: RESPONSABILIDAD ÚNICA = ESTUDIANTES =====

class EstudianteService {
    constructor(private repositorio: RepositorioEstudiante) {}

    registrar(id: number, nombre: string, edad: number, carrera: string): void {
        // ÚNICA RESPONSABILIDAD: Validar y registrar estudiantes
        
        if (edad < 15) {
            throw new Error("Edad no válida. Mínimo 15 años.");
        }

        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío.");
        }

        const estudiante: Estudiante = {
            id,
            nombre,
            edad,
            carrera,
            activo: true
        };

        this.repositorio.agregar(estudiante);
        console.log(`✓ Estudiante ${nombre} registrado correctamente`);
    }

    eliminar(id: number): void {
        const estudiante = this.repositorio.obtener(id);
        
        if (!estudiante) {
            throw new Error(`Estudiante con ID ${id} no encontrado`);
        }

        const resultado = this.repositorio.eliminar(id);
        
        if (resultado) {
            console.log(`✓ Estudiante ${estudiante.nombre} eliminado`);
        }
    }

    obtener(id: number): Estudiante {
        const estudiante = this.repositorio.obtener(id);
        
        if (!estudiante) {
            throw new Error(`Estudiante con ID ${id} no encontrado`);
        }

        return estudiante;
    }

    obtenerTodos(): Estudiante[] {
        return this.repositorio.obtenerTodos();
    }

    listar(): void {
        const estudiantes = this.repositorio.obtenerTodos();
        
        if (estudiantes.length === 0) {
            console.log("No hay estudiantes registrados");
            return;
        }

        console.table(estudiantes);
    }
}
```

### 1.5 Servicio 2: Solo Profesores (SRP)

```typescript
// ===== SERVICIO 2: RESPONSABILIDAD ÚNICA = PROFESORES =====

class ProfesorService {
    constructor(private repositorio: RepositorioProfesor) {}

    registrar(id: number, nombre: string, salario: number): void {
        // ÚNICA RESPONSABILIDAD: Validar y registrar profesores
        
        if (salario <= 0) {
            throw new Error("El salario debe ser mayor que 0");
        }

        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío");
        }

        const profesor: Profesor = {
            id,
            nombre,
            salario
        };

        this.repositorio.agregar(profesor);
        console.log(`✓ Profesor ${nombre} registrado con salario $${salario}`);
    }

    obtener(id: number): Profesor {
        const profesor = this.repositorio.obtener(id);
        
        if (!profesor) {
            throw new Error(`Profesor con ID ${id} no encontrado`);
        }

        return profesor;
    }

    obtenerTodos(): Profesor[] {
        return this.repositorio.obtenerTodos();
    }
}
```

### 1.6 Servicio 3: Solo Cursos (SRP)

```typescript
// ===== SERVICIO 3: RESPONSABILIDAD ÚNICA = CURSOS =====

class CursoService {
    constructor(
        private repositorioCurso: RepositorioCurso,
        private repositorioProfesor: RepositorioProfesor,
        private repositorioEstudiante: RepositorioEstudiante
    ) {}

    crear(codigo: string, nombre: string, profesorId: number): void {
        // ÚNICA RESPONSABILIDAD: Crear cursos
        
        // Validar que el profesor existe
        const profesor = this.repositorioProfesor.obtener(profesorId);
        if (!profesor) {
            throw new Error(`Profesor con ID ${profesorId} no existe`);
        }

        if (!codigo || codigo.trim().length === 0) {
            throw new Error("El código del curso no puede estar vacío");
        }

        const curso: Curso = {
            codigo,
            nombre,
            profesorId,
            estudiantes: []
        };

        this.repositorioCurso.agregar(curso);
        console.log(`✓ Curso ${nombre} (${codigo}) creado por ${profesor.nombre}`);
    }

    matricular(cursoCodigo: string, estudianteId: number): void {
        // ÚNICA RESPONSABILIDAD: Matricular estudiantes en cursos
        
        const curso = this.repositorioCurso.obtener(cursoCodigo);
        if (!curso) {
            throw new Error(`Curso con código ${cursoCodigo} no existe`);
        }

        const estudiante = this.repositorioEstudiante.obtener(estudianteId);
        if (!estudiante) {
            throw new Error(`Estudiante con ID ${estudianteId} no existe`);
        }

        if (curso.estudiantes.includes(estudianteId)) {
            throw new Error(`Estudiante ya está matriculado en ${curso.nombre}`);
        }

        curso.estudiantes.push(estudianteId);
        console.log(`✓ Estudiante ${estudiante.nombre} matriculado en ${curso.nombre}`);
    }
}
```

### 1.7 Servicio 4: Solo Pagos (SRP)

```typescript
// ===== SERVICIO 4: RESPONSABILIDAD ÚNICA = PAGOS =====

class PagoService {
    constructor(private repositorio: RepositorioPago) {}

    procesar(estudianteId: number, monto: number, metodo: string): void {
        // ÚNICA RESPONSABILIDAD: Procesar pagos
        
        if (monto <= 0) {
            throw new Error("El monto debe ser mayor que 0");
        }

        const pago: Pago = {
            estudianteId,
            monto,
            metodo,
            fecha: new Date()
        };

        this.repositorio.agregar(pago);
        console.log(`✓ Pago de $${monto} procesado via ${metodo}`);
    }

    obtenerHistorial(estudianteId: number): Pago[] {
        return this.repositorio.obtenerPorEstudiante(estudianteId);
    }

    listarHistorial(estudianteId: number): void {
        const pagos = this.obtenerHistorial(estudianteId);
        
        if (pagos.length === 0) {
            console.log(`No hay pagos para el estudiante ${estudianteId}`);
            return;
        }

        console.table(pagos);
    }

    obtenerTotal(): number {
        const pagos = this.repositorio.obtenerTodos();
        return pagos.reduce((sum, pago) => sum + pago.monto, 0);
    }
}
```

### 1.8 Servicio 5: Solo Reportes (SRP)

```typescript
// ===== SERVICIO 5: RESPONSABILIDAD ÚNICA = REPORTES =====

class ReporteService {
    constructor(
        private pagoService: PagoService,
        private estudianteService: EstudianteService
    ) {}

    generarReporteFinanciero(): number {
        // ÚNICA RESPONSABILIDAD: Generar reportes
        
        const total = this.pagoService.obtenerTotal();
        console.log("\n📊 === REPORTE FINANCIERO ===");
        console.log(`Total de ingresos: $${total}`);
        console.log("===============================\n");
        return total;
    }

    generarReporteEstudiantes(): void {
        const estudiantes = this.estudianteService.obtenerTodos();
        console.log("\n📚 === REPORTE DE ESTUDIANTES ===");
        console.table(estudiantes);
        console.log(`Total: ${estudiantes.length} estudiantes\n`);
    }
}
```

### 1.9 Orquestador: Sistema Universitario (Coordina)

```typescript
// ===== ORQUESTADOR: SistemaUniversitario =====
// Coordina los servicios pero NO implementa responsabilidades

class SistemaUniversitario {
    private estudianteService: EstudianteService;
    private profesorService: ProfesorService;
    private cursoService: CursoService;
    private pagoService: PagoService;
    private reporteService: ReporteService;

    constructor() {
        // Inicializar repositorios
        const repoEstudiantes = new RepositorioEstudianteArray();
        const repoProfesores = new RepositorioProfesorArray();
        const repoCursos = new RepositorioCursoArray();
        const repoPagos = new RepositorioPagoArray();

        // Inicializar servicios (inyección de dependencias)
        this.estudianteService = new EstudianteService(repoEstudiantes);
        this.profesorService = new ProfesorService(repoProfesores);
        this.cursoService = new CursoService(repoCursos, repoProfesores, repoEstudiantes);
        this.pagoService = new PagoService(repoPagos);
        this.reporteService = new ReporteService(this.pagoService, this.estudianteService);

        console.log("✓ Sistema Universitario iniciado con SOLID");
    }

    // Métodos que COORDINAN (delegan a servicios)
    registrarEstudiante(id: number, nombre: string, edad: number, carrera: string): void {
        this.estudianteService.registrar(id, nombre, edad, carrera);
    }

    registrarProfesor(id: number, nombre: string, salario: number): void {
        this.profesorService.registrar(id, nombre, salario);
    }

    crearCurso(codigo: string, nombre: string, profesorId: number): void {
        this.cursoService.crear(codigo, nombre, profesorId);
    }

    matricularEstudiante(cursoCodigo: string, estudianteId: number): void {
        this.cursoService.matricular(cursoCodigo, estudianteId);
    }

    procesarPago(estudianteId: number, monto: number, metodo: string): void {
        this.pagoService.procesar(estudianteId, monto, metodo);
    }

    generarReporteFinanciero(): number {
        return this.reporteService.generarReporteFinanciero();
    }

    generarReporteEstudiantes(): void {
        this.reporteService.generarReporteEstudiantes();
    }
}
```

### 1.10 Ejemplo de Uso

```typescript
// ===== EJEMPLO DE USO =====
console.log("=== APLICANDO SRP ===\n");

const sistema = new SistemaUniversitario();

// Registrar estudiantes
sistema.registrarEstudiante(1, "Juan Pérez", 18, "Ingeniería");
sistema.registrarEstudiante(2, "María García", 19, "Administración");

// Registrar profesores
sistema.registrarProfesor(101, "Dr. López", 3000);

// Crear curso
sistema.crearCurso("INF101", "Programación I", 101);

// Matricular estudiantes
sistema.matricularEstudiante("INF101", 1);
sistema.matricularEstudiante("INF101", 2);

// Procesar pagos
sistema.procesarPago(1, 500, "tarjeta");
sistema.procesarPago(2, 400, "efectivo");

// Generar reportes
sistema.generarReporteFinanciero();
sistema.generarReporteEstudiantes();
```

---

# ✅ 2. OCP - Open/Closed Principle

## El Problema

```typescript
// ❌ CONDICIONALES HARDCODEADOS
procesarPago(estudianteId: number, monto: number, metodo: string) {
    if (metodo !== "tarjeta" && metodo !== "efectivo") {
        console.log("Método no válido");
        return;
    }

    // Si quiero agregar PayPal, DEBO modificar esta línea
    // Violo OCP
}
```

## La Solución: Strategy Pattern

### 2.1 Interfaz de Procesadores

```typescript
// ===== INTERFAZ: Define el contrato =====

interface ProcesadorPago {
    validar(monto: number): boolean;
    procesar(estudianteId: number, monto: number): void;
    obtenerNombre(): string;
}
```

### 2.2 Implementación 1: Tarjeta

```typescript
// ===== IMPLEMENTACIÓN 1: TARJETA DE CRÉDITO =====

class ProcesadorTarjeta implements ProcesadorPago {
    validar(monto: number): boolean {
        // Validaciones específicas de tarjeta
        if (monto <= 0) return false;
        if (monto > 10000) return false; // Límite de tarjeta
        return true;
    }

    procesar(estudianteId: number, monto: number): void {
        console.log(`💳 Procesando pago con TARJETA: $${monto}`);
        console.log(`   - Estudiante ID: ${estudianteId}`);
        console.log(`   - Fecha: ${new Date().toLocaleString()}`);
        // Lógica específica de tarjeta (conectar con banco, etc.)
    }

    obtenerNombre(): string {
        return "Tarjeta de Crédito";
    }
}
```

### 2.3 Implementación 2: Efectivo

```typescript
// ===== IMPLEMENTACIÓN 2: EFECTIVO =====

class ProcesadorEfectivo implements ProcesadorPago {
    validar(monto: number): boolean {
        // Validaciones específicas de efectivo
        if (monto <= 0) return false;
        if (monto > 1000) return false; // Límite de efectivo
        return true;
    }

    procesar(estudianteId: number, monto: number): void {
        console.log(`💵 Procesando pago en EFECTIVO: $${monto}`);
        console.log(`   - Estudiante ID: ${estudianteId}`);
        console.log(`   - Recibo generado: ${Date.now()}`);
        // Lógica específica de efectivo
    }

    obtenerNombre(): string {
        return "Efectivo";
    }
}
```

### 2.4 Implementación 3: PayPal (NUEVA - SIN MODIFICAR EXISTENTES)

```typescript
// ===== IMPLEMENTACIÓN 3: PAYPAL ✅ NUEVA =====
// ✅ Crear NUEVA CLASE, no modificar las anteriores

class ProcesadorPayPal implements ProcesadorPago {
    validar(monto: number): boolean {
        // Validaciones específicas de PayPal
        if (monto <= 0) return false;
        if (monto > 5000) return false; // Límite de PayPal
        return true;
    }

    procesar(estudianteId: number, monto: number): void {
        console.log(`🅿️  Procesando pago con PAYPAL: $${monto}`);
        console.log(`   - Estudiante ID: ${estudianteId}`);
        console.log(`   - Token de transacción: ${Math.random().toString(36).substring(7)}`);
        // Lógica específica de PayPal (conexión con API PayPal)
    }

    obtenerNombre(): string {
        return "PayPal";
    }
}
```

### 2.5 Implementación 4: Transferencia (NUEVA)

```typescript
// ===== IMPLEMENTACIÓN 4: TRANSFERENCIA ✅ NUEVA =====

class ProcesadorTransferencia implements ProcesadorPago {
    validar(monto: number): boolean {
        // Validaciones específicas de transferencia
        if (monto <= 0) return false;
        if (monto > 50000) return false; // Límite de transferencia
        return true;
    }

    procesar(estudianteId: number, monto: number): void {
        console.log(`🏦 Procesando pago por TRANSFERENCIA: $${monto}`);
        console.log(`   - Estudiante ID: ${estudianteId}`);
        console.log(`   - Referencia: TRF-${Date.now()}`);
        // Lógica específica de transferencia
    }

    obtenerNombre(): string {
        return "Transferencia Bancaria";
    }
}
```

### 2.6 Implementación 5: Criptomoneda (NUEVA)

```typescript
// ===== IMPLEMENTACIÓN 5: CRIPTOMONEDA ✅ NUEVA =====

class ProcesadorCripto implements ProcesadorPago {
    validar(monto: number): boolean {
        // Criptomoneda sin límites teóricos
        return monto > 0;
    }

    procesar(estudianteId: number, monto: number): void {
        console.log(`₿ Procesando pago con CRIPTO: $${monto}`);
        console.log(`   - Estudiante ID: ${estudianteId}`);
        console.log(`   - Hash de transacción: ${Math.random().toString(16).substring(2)}`);
        // Lógica específica de criptomoneda (blockchain, wallets, etc.)
    }

    obtenerNombre(): string {
        return "Criptomoneda";
    }
}
```

### 2.7 Servicio de Pagos Refactorizado

```typescript
// ===== SERVICIO: Usa procesadores =====

class PagoServiceOCP {
    private procesadores: Map<string, ProcesadorPago> = new Map();
    private repositorio: RepositorioPago;

    constructor(repositorio: RepositorioPago) {
        this.repositorio = repositorio;
    }

    // ✅ ABIERTO A EXTENSIÓN: Agregar nuevos procesadores
    registrarProcesador(nombre: string, procesador: ProcesadorPago): void {
        this.procesadores.set(nombre, procesador);
        console.log(`✓ Procesador registrado: ${procesador.obtenerNombre()}`);
    }

    // ✅ CERRADO A MODIFICACIÓN: Este método NUNCA cambia
    procesar(estudianteId: number, monto: number, metodo: string): void {
        // Obtener el procesador correspondiente
        const procesador = this.procesadores.get(metodo);

        if (!procesador) {
            throw new Error(`Método de pago no soportado: ${metodo}`);
        }

        // Validar monto
        if (!procesador.validar(monto)) {
            throw new Error(`Monto inválido para ${procesador.obtenerNombre()}`);
        }

        // Procesar el pago
        procesador.procesar(estudianteId, monto);

        // Guardar en repositorio
        const pago: Pago = {
            estudianteId,
            monto,
            metodo,
            fecha: new Date()
        };

        this.repositorio.agregar(pago);
    }

    obtenerMetodosDisponibles(): string[] {
        return Array.from(this.procesadores.keys());
    }

    listarProcesadores(): void {
        console.log("\n📋 Métodos de pago disponibles:");
        this.procesadores.forEach((procesador, nombre) => {
            console.log(`   - ${nombre}: ${procesador.obtenerNombre()}`);
        });
    }
}
```

### 2.8 Ejemplo de Uso OCP

```typescript
// ===== EJEMPLO DE USO: OCP =====
console.log("\n=== APLICANDO OCP ===\n");

const repoPagos = new RepositorioPagoArray();
const pagoService = new PagoServiceOCP(repoPagos);

// Registrar procesadores iniciales
pagoService.registrarProcesador("tarjeta", new ProcesadorTarjeta());
pagoService.registrarProcesador("efectivo", new ProcesadorEfectivo());

console.log("\n--- Procesando pagos con métodos iniciales ---");
pagoService.procesar(1, 500, "tarjeta");
pagoService.procesar(2, 200, "efectivo");

// ✅ SEMANA 1: Agregar PayPal (SIN MODIFICAR código existente)
console.log("\n--- Agregando PayPal (NUEVA CLASE) ---");
pagoService.registrarProcesador("paypal", new ProcesadorPayPal());
pagoService.procesar(3, 1500, "paypal");

// ✅ SEMANA 2: Agregar Transferencia (SIN MODIFICAR código existente)
console.log("\n--- Agregando Transferencia (NUEVA CLASE) ---");
pagoService.registrarProcesador("transferencia", new ProcesadorTransferencia());
pagoService.procesar(4, 3000, "transferencia");

// ✅ SEMANA 3: Agregar Cripto (SIN MODIFICAR código existente)
console.log("\n--- Agregando Criptomoneda (NUEVA CLASE) ---");
pagoService.registrarProcesador("cripto", new ProcesadorCripto());
pagoService.procesar(5, 10000, "cripto");

// Verificar que los métodos iniciales aún funcionan
console.log("\n--- Verificando que métodos iniciales funcionan ---");
pagoService.procesar(1, 600, "tarjeta"); // Aún funciona ✓

pagoService.listarProcesadores();
```

---

# ✅ 3. LSP - Liskov Substitution Principle

## El Concepto

```typescript
// ===== LSP: Las subclases pueden reemplazar superclases =====

// ✅ Todos cumplen el contrato ProcesadorPago
const procesador1: ProcesadorPago = new ProcesadorTarjeta();
const procesador2: ProcesadorPago = new ProcesadorPayPal();
const procesador3: ProcesadorPago = new ProcesadorCripto();

// ✅ Puedo intercambiarlos sin problema
function procesarConProcesador(p: ProcesadorPago, monto: number) {
    if (p.validar(monto)) {
        p.procesar(1, monto);
    }
}

procesarConProcesador(procesador1, 500); // Funciona
procesarConProcesador(procesador2, 500); // Funciona igual
procesarConProcesador(procesador3, 500); // Funciona igual
```

## ❌ Violación de LSP

```typescript
// ❌ MAL: Subclase que viola el contrato

class Ave {
    volar(): string {
        return "Volando...";
    }
}

class Paloma extends Ave {
    volar(): string {
        return "Volando"; // ✓ Cumple contrato
    }
}

class Pingüino extends Ave {
    volar(): string {
        throw new Error("Los pingüinos no pueden volar!"); // ❌ VIOLA LSP
    }
}

// Cuando usas una Ave, esperas que pueda volar
function hacerVolar(ave: Ave) {
    console.log(ave.volar()); // ¡Crash si es Pingüino!
}
```

## ✅ Solución Correcta

```typescript
// ===== SOLUCIÓN: Respetar LSP =====

abstract class Ave {
    abstract moverse(): string;
}

class AveVoladora extends Ave {
    moverse(): string {
        return "Volando...";
    }
}

class AveTerrestre extends Ave {
    moverse(): string {
        return "Corriendo...";
    }
}

class Paloma extends AveVoladora { }
class Pingüino extends AveTerrestre { }

// Ahora cada tipo se comporta correctamente
function hacerMoverse(ave: Ave) {
    console.log(ave.moverse()); // Siempre funciona correctamente
}
```

---

# ✅ 4. ISP - Interface Segregation Principle

## El Problema

```typescript
// ❌ INTERFAZ MONOLÍTICA (No Segregada)

interface GestorSistemaCompleto {
    // Métodos de estudiantes
    registrarEstudiante(): void;
    eliminarEstudiante(): void;

    // Métodos de profesores
    registrarProfesor(): void;
    eliminarProfesor(): void;

    // Métodos de cursos
    crearCurso(): void;
    matricularEstudiante(): void;

    // Métodos de pagos
    procesarPago(): void;

    // Métodos de reportes
    generarReporte(): void;

    // Métodos de respaldos
    respaldarDatos(): void;

    // Métodos de sistema
    iniciar(): void;
    detener(): void;
}

// Si implemento esta interfaz, DEBO implementar TODO
// Aunque solo necesite procesar pagos
class ControladorPagos implements GestorSistemaCompleto {
    // Debo implementar 12 métodos... aunque solo use 1
    registrarEstudiante() { }     // No necesito
    eliminarEstudiante() { }      // No necesito
    registrarProfesor() { }       // No necesito
    // ... 9 métodos más que NO necesito
}
```

## ✅ La Solución: Interfaces Segregadas

### 4.1 Interfaces Específicas

```typescript
// ===== INTERFACES SEGREGADAS: Una por dominio =====

// Interface 1: Solo estudiantes
interface GestorEstudiantes {
    registrarEstudiante(id: number, nombre: string, edad: number, carrera: string): void;
    eliminarEstudiante(id: number): void;
    obtenerEstudiante(id: number): Estudiante;
}

// Interface 2: Solo profesores
interface GestorProfesores {
    registrarProfesor(id: number, nombre: string, salario: number): void;
    obtenerProfesor(id: number): Profesor;
}

// Interface 3: Solo cursos
interface GestorCursos {
    crearCurso(codigo: string, nombre: string, profesorId: number): void;
    matricularEstudiante(cursoCodigo: string, estudianteId: number): void;
}

// Interface 4: Solo pagos
interface GestorPagos {
    procesarPago(estudianteId: number, monto: number, metodo: string): void;
    obtenerHistorialPagos(estudianteId: number): Pago[];
}

// Interface 5: Solo reportes
interface GeneradorReportes {
    generarReporteFinanciero(): number;
    generarReporteEstudiantes(): void;
}
```

### 4.2 Implementaciones de Interfaces Segregadas

```typescript
// ===== IMPLEMENTACIONES QUE USAN SOLO LO QUE NECESITAN =====

// Implementación que SOLO gestiona estudiantes
class ServicioEstudiantes implements GestorEstudiantes {
    constructor(private repositorio: RepositorioEstudiante) {}

    registrarEstudiante(id: number, nombre: string, edad: number, carrera: string): void {
        // Solo implemento lo de estudiantes
        if (edad < 15) throw new Error("Edad no válida");
        this.repositorio.agregar({ id, nombre, edad, carrera, activo: true });
    }

    eliminarEstudiante(id: number): void {
        this.repositorio.eliminar(id);
    }

    obtenerEstudiante(id: number): Estudiante {
        return this.repositorio.obtener(id)!;
    }
}

// Implementación que SOLO procesa pagos
class ServicioPagos implements GestorPagos {
    constructor(private repositorio: RepositorioPago) {}

    procesarPago(estudianteId: number, monto: number, metodo: string): void {
        // Solo implemento lo de pagos
        if (monto <= 0) throw new Error("Monto inválido");
        this.repositorio.agregar({
            estudianteId,
            monto,
            metodo,
            fecha: new Date()
        });
    }

    obtenerHistorialPagos(estudianteId: number): Pago[] {
        return this.repositorio.obtenerPorEstudiante(estudianteId);
    }
}

// Implementación que SOLO genera reportes
class ServicioReportes implements GeneradorReportes {
    constructor(
        private pagoService: ServicioPagos,
        private estudianteService: ServicioEstudiantes
    ) {}

    generarReporteFinanciero(): number {
        // Solo implemento lo de reportes financieros
        const total = this.pagoService.obtenerHistorialPagos(1)
            .reduce((sum, pago) => sum + pago.monto, 0);
        return total;
    }

    generarReporteEstudiantes(): void {
        // Solo implemento lo de reportes de estudiantes
        console.log("Reporte de estudiantes generado");
    }
}
```

### 4.3 Clientes que Usan Solo Lo Necesario

```typescript
// ===== CLIENTES: Dependen solo de lo que necesitan =====

// Controlador de Estudiantes: Solo necesita GestorEstudiantes
class ControladorEstudiantes {
    constructor(private gestorEstudiantes: GestorEstudiantes) {}

    procesar() {
        // ✅ Solo tengo acceso a métodos de estudiantes
        // No tengo métodos de pagos, reportes, etc.
        this.gestorEstudiantes.registrarEstudiante(1, "Juan", 18, "Ing");
    }
}

// Controlador de Pagos: Solo necesita GestorPagos
class ControladorPagos {
    constructor(private gestorPagos: GestorPagos) {}

    procesar() {
        // ✅ Solo tengo acceso a métodos de pagos
        // No tengo métodos de estudiantes, reportes, etc.
        this.gestorPagos.procesarPago(1, 500, "tarjeta");
    }
}

// Controlador de Reportes: Solo necesita GeneradorReportes
class ControladorReportes {
    constructor(private generador: GeneradorReportes) {}

    procesar() {
        // ✅ Solo tengo acceso a métodos de reportes
        this.generador.generarReporteFinanciero();
    }
}

// ✅ Ventaja: Cada cliente depende SOLO de lo que necesita
// ✅ Ventaja: Menos acoplamiento, más flexibilidad
// ✅ Ventaja: Cambiar una interfaz no afecta a otras
```

---

# ✅ 5. DIP - Dependency Inversion Principle

## El Problema

```typescript
// ❌ ACOPLAMIENTO DIRECTO A CONCRETOS

class SistemaUniversitario {
    private estudiantes: any[] = [];     // ❌ Depende de Array concreto
    private profesores: any[] = [];      // ❌ Depende de Array concreto
    private cursos: any[] = [];          // ❌ Depende de Array concreto
    private pagos: any[] = [];           // ❌ Depende de Array concreto

    procesarPago(estudianteId: number, monto: number, metodo: string) {
        // ❌ Maneja directamente la estructura de datos
        this.pagos.push({
            estudianteId,
            monto,
            metodo,
            fecha: new Date()
        });
    }
}

// Problema: Si quiero cambiar de Array → Base de Datos
// ¡TODA LA CLASE CAMBIA!
```

## ✅ La Solución: Repository Pattern + Inyección de Dependencias

### 5.1 Interfaces (Abstracciones)

```typescript
// ===== ABSTRACCIONES: Define contratos =====

interface RepositorioEstudiante {
    agregar(estudiante: Estudiante): Promise<void>;
    eliminar(id: number): Promise<boolean>;
    obtener(id: number): Promise<Estudiante | null>;
    obtenerTodos(): Promise<Estudiante[]>;
}

interface RepositorioPago {
    agregar(pago: Pago): Promise<void>;
    obtenerPorEstudiante(estudianteId: number): Promise<Pago[]>;
    obtenerTodos(): Promise<Pago[]>;
}
```

### 5.2 Implementación 1: Array (Desarrollo/Testing)

```typescript
// ===== IMPLEMENTACIÓN 1: Array (En memoria) =====

class RepositorioPagoArray implements RepositorioPago {
    private pagos: Pago[] = [];
    private idCounter = 1;

    async agregar(pago: Pago): Promise<void> {
        if (!pago.id) {
            pago.id = this.idCounter++;
        }
        this.pagos.push(pago);
        console.log("✓ Pago guardado en ARRAY");
    }

    async obtenerPorEstudiante(estudianteId: number): Promise<Pago[]> {
        return this.pagos.filter(p => p.estudianteId === estudianteId);
    }

    async obtenerTodos(): Promise<Pago[]> {
        return [...this.pagos];
    }
}
```

### 5.3 Implementación 2: Base de Datos SQL

```typescript
// ===== IMPLEMENTACIÓN 2: Base de Datos SQL =====

class RepositorioPagoBD implements RepositorioPago {
    constructor(private conexion: DatabaseConnection) {}

    async agregar(pago: Pago): Promise<void> {
        const query = `
            INSERT INTO pagos (estudiante_id, monto, metodo, fecha)
            VALUES (?, ?, ?, ?)
        `;

        await this.conexion.execute(query, [
            pago.estudianteId,
            pago.monto,
            pago.metodo,
            pago.fecha
        ]);

        console.log("✓ Pago guardado en BASE DE DATOS SQL");
    }

    async obtenerPorEstudiante(estudianteId: number): Promise<Pago[]> {
        const query = `
            SELECT * FROM pagos
            WHERE estudiante_id = ?
        `;

        return await this.conexion.query(query, [estudianteId]);
    }

    async obtenerTodos(): Promise<Pago[]> {
        const query = "SELECT * FROM pagos";
        return await this.conexion.query(query);
    }
}
```

### 5.4 Implementación 3: API REST Externa

```typescript
// ===== IMPLEMENTACIÓN 3: API REST Externa =====

class RepositorioPagoAPI implements RepositorioPago {
    constructor(private apiClient: ApiClient) {}

    async agregar(pago: Pago): Promise<void> {
        const response = await this.apiClient.post("/pagos", pago);
        console.log("✓ Pago guardado en API EXTERNA");
        return response.data;
    }

    async obtenerPorEstudiante(estudianteId: number): Promise<Pago[]> {
        const response = await this.apiClient.get(
            `/pagos?estudiante_id=${estudianteId}`
        );
        return response.data;
    }

    async obtenerTodos(): Promise<Pago[]> {
        const response = await this.apiClient.get("/pagos");
        return response.data;
    }
}
```

### 5.5 Implementación 4: Firebase

```typescript
// ===== IMPLEMENTACIÓN 4: Firebase Cloud =====

class RepositorioPagoFirebase implements RepositorioPago {
    constructor(private firestore: FirestoreConnection) {}

    async agregar(pago: Pago): Promise<void> {
        await this.firestore.collection("pagos").add(pago);
        console.log("✓ Pago guardado en FIREBASE");
    }

    async obtenerPorEstudiante(estudianteId: number): Promise<Pago[]> {
        const snapshot = await this.firestore
            .collection("pagos")
            .where("estudianteId", "==", estudianteId)
            .get();

        return snapshot.docs.map(doc => doc.data() as Pago);
    }

    async obtenerTodos(): Promise<Pago[]> {
        const snapshot = await this.firestore.collection("pagos").get();
        return snapshot.docs.map(doc => doc.data() as Pago);
    }
}
```

### 5.6 Servicio con Inyección de Dependencia

```typescript
// ===== SERVICIO: Depende de abstracción, no de implementación =====

class PagoServiceDIP {
    // ✅ INYECCIÓN: Recibe la abstracción
    constructor(private repositorio: RepositorioPago) {}

    async procesar(estudianteId: number, monto: number, metodo: string): Promise<void> {
        // ✅ No sabe CÓMO se guardan los datos
        // ✅ Solo sabe que repositorio cumple la interfaz

        if (monto <= 0) {
            throw new Error("Monto inválido");
        }

        const pago: Pago = {
            estudianteId,
            monto,
            metodo,
            fecha: new Date()
        };

        // ✅ Funciona con CUALQUIER implementación
        await this.repositorio.agregar(pago);

        console.log(`Pago de $${monto} procesado correctamente`);
    }

    async obtenerHistorial(estudianteId: number): Promise<Pago[]> {
        return await this.repositorio.obtenerPorEstudiante(estudianteId);
    }
}
```

### 5.7 Ejemplo de Uso: Cambiar Implementación

```typescript
// ===== EJEMPLO: Cambiar de Array → BD → API → Firebase =====

console.log("\n=== APLICANDO DIP ===\n");

// ========= ESCENARIO 1: DESARROLLO (Array) =========
console.log("--- DESARROLLO: Usando Array ---");
const repoArray = new RepositorioPagoArray();
const pagoServiceDev = new PagoServiceDIP(repoArray);

await pagoServiceDev.procesar(1, 500, "tarjeta");
// Salida: ✓ Pago guardado en ARRAY

// ========= ESCENARIO 2: TESTING (Array) =========
console.log("\n--- TESTING: Usando Array (mismo que desarrollo) ---");
// Mismo código, pero con datos limpios por cada test

// ========= ESCENARIO 3: PRODUCCIÓN (Base de Datos) =========
console.log("\n--- PRODUCCIÓN: Cambiando a Base de Datos ---");

// ✅ CAMBIO UNA SOLA LÍNEA
const conexionBD = new DatabaseConnection("postgresql://localhost/universidad");
const repoBD = new RepositorioPagoBD(conexionBD);
const pagoServiceProd = new PagoServiceDIP(repoBD);

// ✅ EL RESTO DEL CÓDIGO NO CAMBIA
await pagoServiceProd.procesar(1, 500, "tarjeta");
// Salida: ✓ Pago guardado en BASE DE DATOS SQL

// ========= ESCENARIO 4: MIGRACIÓN A API EXTERNA =========
console.log("\n--- MIGRACIÓN: Cambiando a API Externa ---");

const apiClient = new ApiClient("https://api.pagos.com");
const repoAPI = new RepositorioPagoAPI(apiClient);
const pagoServiceAPI = new PagoServiceDIP(repoAPI);

// ✅ MISMA INTERFAZ, OTRA IMPLEMENTACIÓN
await pagoServiceAPI.procesar(1, 500, "tarjeta");
// Salida: ✓ Pago guardado en API EXTERNA

// ========= ESCENARIO 5: MIGRACIÓN A FIREBASE =========
console.log("\n--- MIGRACIÓN: Cambiando a Firebase ---");

const firestore = new FirestoreConnection("proyecto-universidad");
const repoFirebase = new RepositorioPagoFirebase(firestore);
const pagoServiceFirebase = new PagoServiceDIP(repoFirebase);

// ✅ MISMA INTERFAZ, OTRA IMPLEMENTACIÓN MÁS
await pagoServiceFirebase.procesar(1, 500, "tarjeta");
// Salida: ✓ Pago guardado en FIREBASE

console.log("\n⭐ Con DIP:");
console.log("✓ Cambié de Array → BD → API → Firebase");
console.log("✓ Sin modificar PagoServiceDIP");
console.log("✓ Sin modificar métodos que la usan");
console.log("✓ Solo cambié la línea de inyección");
```

### 5.8 Factory Pattern (Bonus)

```typescript
// ===== BONUS: Factory para gestionar creación =====

interface RepositorioFactory {
    crearRepositorioPago(): RepositorioPago;
}

class RepositorioFactoryDesarrollo implements RepositorioFactory {
    crearRepositorioPago(): RepositorioPago {
        return new RepositorioPagoArray();
    }
}

class RepositorioFactoryProduccion implements RepositorioFactory {
    crearRepositorioPago(): RepositorioPago {
        const conexion = new DatabaseConnection("postgresql://...");
        return new RepositorioPagoBD(conexion);
    }
}

// Uso
const ambiente = process.env.NODE_ENV;
const factory = ambiente === "production"
    ? new RepositorioFactoryProduccion()
    : new RepositorioFactoryDesarrollo();

const repositorio = factory.crearRepositorioPago();
const pagoService = new PagoServiceDIP(repositorio);

// ✅ Cambio de ambiente automático sin modificar servicios
```
