class SistemaUniversitario {class iniciado");
    }

    registrarEstudiante(id: number, nombre: string, edad: number, carrera: string) {
        if (edad < 15) {
            console.log("Edad no válida");
            return;
        }

        this.estudiantes.push({
            id: id,
            nombre: nombre,
            edad: edad,
            carrera: carrera,
            activo: true
        });

        console.log("Estudiante registrado");
    }

    eliminarEstudiante(id: number) {
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].id === id) {
                this.estudiantes.splice(i, 1);
                console.log("Estudiante eliminado");
                return;
            }
        }
        console.log("Estudiante no encontrado");
    }

    registrarProfesor(id: number, nombre: string, salario: number) {
        if (salario <= 0) {
            console.log("Salario inválido");
            return;
        }

        this.profesores.push({
            id: id,
            nombre: nombre,
            salario: salario
        });

        console.log("Profesor registrado");
    }

    crearCurso(codigo: string, nombre: string, profesorId: number) {
        let profesorExiste = false;

        for (let p of this.profesores) {
            if (p.id === profesorId) {
                profesorExiste = true;
            }
        }

        if (!profesorExiste) {
            console.log("Profesor no existe");
            return;
        }

        this.cursos.push({
            codigo: codigo,
            nombre: nombre,
            profesorId: profesorId,
            estudiantes: []
        });

        console.log("Curso creado");
    }

    matricularEstudiante(cursoCodigo: string, estudianteId: number) {
        let curso: any = null;
        let estudiante: any = null;

        for (let c of this.cursos) {
            if (c.codigo === cursoCodigo) {
                curso = c;
            }
        }

        for (let e of this.estudiantes) {
            if (e.id === estudianteId) {
                estudiante = e;
            }
        }

        if (curso == null || estudiante == null) {
            console.log("Curso o estudiante no encontrado");
            return;
        }

        curso.estudiantes.push(estudianteId);
        console.log("Estudiante matriculado");
    }

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
            estudianteId: estudianteId,
            monto: monto,
            metodo: metodo,
            fecha: new Date()
        });

        console.log("Pago registrado");
    }

    generarReporteFinanciero() {
        let total = 0;

        for (let p of this.pagos) {
            total += p.monto;
        }

        console.log("Total de ingresos:", total);
        return total;
    }


    private estudiantes: any[] = [];
    private profesores: any[] = [];
    private cursos: any[] = [];
    private pagos: any[] = [];

    constructor() {
