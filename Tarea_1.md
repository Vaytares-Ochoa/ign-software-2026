# _Universidad Politecnica de Honduras_

Tatiana Vaytares Ochoa Aguilar\
**Clase: Ingenieria de Software**\
**Ing. Raul Antonio Fernandez Fajardo**

---

# 1. Sistema de Software para el Documento de Identificación Nacional (RNP – 2020‑2021)

Uno de los proyectos de software más relevantes y problemáticos en Honduras fue la implementación del sistema informático para el nuevo Documento Nacional de Identificación (DNI), desarrollado para el Registro Nacional de las Personas (RNP) entre 2020 y 2021, con apoyo del PNUD.

A partir de la información encontrada, el proyecto presentaba fallas importantes, como retrasos en la entrega del documento, errores en los datos de los ciudadanos y deficiencias en la integración de bases de datos. También se evidenció que el software fue entregado sin estar completamente funcional, lo que generó inconformidad en la población y afectó el desarrollo del proyecto.

El objetivo del proyecto era modernizar la identidad ciudadana, digitalizar la base de datos nacional y asegurar un proceso eficiente, confiable y seguro para millones de hondureños. Sin embargo, el sistema presentó múltiples fallas que afectaron gravemente su ejecución y credibilidad.

---

## ¿Qué problema ocurrió?

Durante la ejecución del proyecto se evidenciaron diversos problemas técnicos y de gestión:

* Retrasos prolongados en la entrega del DNI
* Software incompleto, inestable y poco confiable
* Errores en datos personales (nombres incorrectos, duplicados)
* Falta de sincronización entre bases de datos existentes
* Incumplimiento de los tiempos y requisitos contractuales
* Inconformidad y desconfianza de la población
* Costos adicionales y extensión del cronograma del proyecto

El sistema fue entregado sin cumplir completamente los criterios de aceptación, lo que provocó que un proceso considerado de seguridad nacional se viera seriamente comprometido.

---

## Fase del SDLC donde ocurrió el fallo principal

El fallo principal ocurrió en dos fases clave del Ciclo de Vida del Desarrollo de Software (SDLC):

### Análisis y Diseño (Fallo principal)

**¿Por qué?**

* No se definieron correctamente los requisitos funcionales y no funcionales
* No se analizaron escenarios reales (volumen de usuarios, errores humanos,  migración de datos)
* Falta de planificación en la integración con sistemas y bases de datos previas
* Deficiente evaluación de riesgos y complejidad del proyecto

### Pruebas (Fallo secundario pero crítico)

* Pruebas insuficientes antes de la entrega
* No se detectaron fallas de estabilidad y rendimiento
* El sistema fue desplegado sin validación integral

---

## Diagrama simple del SDLC con el punto de fallo

```
1. Planificación
        ↓
2. Análisis  ❌ (FALLO PRINCIPAL)
        ↓
3. Diseño    ❌ (FALLO RELACIONADO)
        ↓
4. Desarrollo
        ↓
5. Pruebas   ⚠️ (Insuficientes)
        ↓
6. Implementación
        ↓
7. Mantenimiento
```

---

## ¿Qué herramienta de IA podría haber prevenido el fallo?

El uso de herramientas de Inteligencia Artificial aplicadas al análisis y testing habría reducido considerablemente los problemas del proyecto.

## IA para análisis predictivo y testing automatizado

### Posibles usos:

* Análisis de requisitos usando procesamiento de lenguaje natural (NLP) para detectar ambigüedades
* Identificación de duplicados e inconsistencias en grandes bases de datos
* Simulación de escenarios reales con millones de registros
* Pruebas automáticas inteligentes para detectar fallos de estabilidad y rendimiento

### Beneficios:

* Detección temprana de errores críticos
* Mejora en la calidad de los datos
* Reducción de retrasos y sobrecostos
* Mayor confiabilidad del sistema antes de su despliegue

---

## Conclusión

En mi opinión, el caso del sistema de software del Registro Nacional de las Personas (RNP) para el Documento Nacional de Identificación demuestra que una mala definición de los requisitos y un análisis insuficiente pueden afectar gravemente el desarrollo de un proyecto de software, incluso cuando se trata de un sistema de gran importancia nacional. Considero que los errores cometidos en las fases de análisis, diseño y pruebas provocaron retrasos, fallas técnicas y desconfianza en la población.\
Desde mi punto de vista, la implementación de herramientas de Inteligencia Artificial en el análisis de requisitos y en las pruebas del sistema habría permitido detectar inconsistencias, errores en los datos y problemas de rendimiento antes del lanzamiento. Esto habría contribuido a mejorar la calidad del software, reducir costos y garantizar un sistema más confiable y eficiente para los ciudadanos.
