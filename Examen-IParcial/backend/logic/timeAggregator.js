// ------------------------------
// Datos simulados (normalmente vienen de BD)
// ------------------------------

const puestos = [
    { id: 1, nombre: 'Director General', parent_id: null },
    { id: 2, nombre: 'Gerente Tecnología', parent_id: 1 },
    { id: 3, nombre: 'Gerente Administrativo', parent_id: 1 },
    { id: 4, nombre: 'Líder Backend', parent_id: 2 },
    { id: 5, nombre: 'Líder Frontend', parent_id: 2 },
    { id: 6, nombre: 'Analista Contable', parent_id: 3 }
];

const tareas = [
    {
        puesto_id: 4,
        fecha: '2026-03-10',
        estimado_horas: 40,
        completado_horas: 30
    },
    {
        puesto_id: 4,
        fecha: '2026-03-20',
        estimado_horas: 20,
        completado_horas: 20
    },
    {
        puesto_id: 6,
        fecha: '2026-09-01',
        estimado_horas: 30,
        completado_horas: 10
    },
    {
        puesto_id: 5,
        fecha: '2026-06-15',
        estimado_horas: 50,
        completado_horas: 25
    }
];

// ------------------------------
// Utilidades de fechas
// ------------------------------

function isWithinPeriod(dateStr, plazo) {
    const date = new Date(dateStr);
    const now = new Date();

    switch (plazo) {
        case 'semanal':
            return date >= startOfWeek(now) && date <= now;
        case 'mensual':
            return date.getMonth() === now.getMonth()
                && date.getFullYear() === now.getFullYear();
        case 'anual':
            return date.getFullYear() === now.getFullYear();
        default:
            return false;
    }
}

function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
}

// ------------------------------
// Agregación recursiva
// ------------------------------

function buildTree(parentId = null) {
    return puestos
        .filter(p => p.parent_id === parentId)
        .map(p => ({
            ...p,
            children: buildTree(p.id)
        }));
}

function aggregateNode(node, plazo) {
    const tareasNodo = tareas.filter(
        t => t.puesto_id === node.id && isWithinPeriod(t.fecha, plazo)
    );

    let estimado = tareasNodo.reduce((sum, t) => sum + t.estimado_horas, 0);
    let completado = tareasNodo.reduce((sum, t) => sum + t.completado_horas, 0);

    const hijos = node.children.map(child => aggregateNode(child, plazo));

    // 👇 SUMA DE SUBORDINADOS (REQUISITO CLAVE)
    hijos.forEach(hijo => {
        estimado += hijo.carga_trabajo;
        completado += hijo.completado_horas;
    });

    const avance = estimado === 0
        ? 0
        : Math.round((completado / estimado) * 100);

    return {
        puesto_id: node.id,
        puesto: node.nombre,
        carga_trabajo: estimado,
        completado_horas: completado,
        avance_porcentaje: avance,
        subordinados: hijos
    };
}

// ------------------------------
// Función principal exportada
// ------------------------------

export async function aggregateByPeriod(plazo) {
    const arbol = buildTree();
    return arbol.map(root => aggregateNode(root, plazo));
}
