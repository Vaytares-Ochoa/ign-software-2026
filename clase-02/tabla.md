┌────┬──────────────────────────────┬─────────────────────────────────┬──────────────────────────────────────────────────┬────────┐
│ ID │ Título Corto                 │ Como / Quiero / Para que        │ Criterios de Aceptación (Resumido)               │ Prioridad
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 1  │ Búsqueda de Disponibilidad   │ EST: Buscar libro por título,   │ ✓ Búsqueda por 4 campos (título, autor, ISBN,    │ ALTA   │
│    │ de Libros                    │ autor o ISBN / Verificar        │   materia)                                       │
│    │                              │ disponibilidad sin ir a físico  │ ✓ Actualización cada 60s                         │
│    │                              │                                 │ ✓ Mostrar "X de Y copias"                        │
│    │                              │                                 │ ✓ Ubicación en estantería (sección, nivel)      │
│    │                              │                                 │ ✓ Tolerancia a typos con sugerencias             │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 3  │ Registrar Préstamo con       │ BIBL: Escanear código de        │ ✓ Lectura código libro < 2s                      │ ALTA   │
│    │ Código de Barras             │ barras / Registrar              │ ✓ Lectura carné estudiante < 2s                  │
│    │                              │ automáticamente sin escribir    │ ✓ Validar estudiante activo en SIAA              │
│    │                              │                                 │ ✓ Rechazar si tiene multas pendientes             │
│    │                              │                                 │ ✓ Vencimiento = actual + 14 días                 │
│    │                              │                                 │ ✓ Recibo impreso automático                      │
│    │                              │                                 │ ✓ Máximo 5 libros simultáneos                    │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 5  │ Renovar Préstamo en Línea    │ EST: Renovar libro + 14 días    │ ✓ Botón en "Mis Préstamos Activos"               │ ALTA   │
│    │                              │ desde portal / No ir a biblio   │ ✓ Máximo 2 renovaciones por préstamo             │
│    │                              │                                 │ ✓ Rechazar si hay reservas en cola               │
│    │                              │                                 │ ✓ Confirmación email con nueva fecha             │
│    │                              │                                 │ ✓ Validar sin deudas nuevas                      │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 6  │ Registrar Devolución de      │ BIBL: Escanear código del       │ ✓ Lectura código < 2s                            │ ALTA   │
│    │ Libro                        │ libro devuelto / Sistema sepa   │ ✓ Identifica préstamo activo                     │
│    │                              │ que está disponible nuevamente  │ ✓ Calcula días de atraso                         │
│    │                              │                                 │ ✓ Marca libro disponible en catálogo             │
│    │                              │                                 │ ✓ Genera multa automática si atraso              │
│    │                              │                                 │ ✓ Opción reportar daño + foto                    │
│    │                              │                                 │ ✓ Notifica a estudiantes en cola de espera       │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 7  │ Generar Multa Automática por │ SIS: Calcular multa             │ ✓ Fórmula: CEILING(días) × 500 pesos             │ ALTA   │
│    │ Atraso                       │ automáticamente / Sea           │ ✓ Tope máximo: $25,000 pesos                     │
│    │                              │ consistente y justo             │ ✓ Bloquea nuevos préstamos hasta pagar           │
│    │                              │                                 │ ✓ Comprobante PDF descargable                    │
│    │                              │                                 │ ✓ Email automático con vencimiento 10 días       │
│    │                              │                                 │ ✓ Historial de multas pagadas                    │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 2  │ Visualizar Detalles del      │ EST: Ver info detallada del     │ ✓ Imagen portada (requisito)                     │ MEDIA  │
│    │ Libro                        │ libro / Decidir si es recurso   │ ✓ Datos bibliográficos completos                 │
│    │                              │ que necesito                    │ ✓ Resumen del contenido                          │
│    │                              │                                 │ ✓ Cantidad de préstamos previos (no datos)       │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 4  │ Notificación de Vencimiento  │ EST: Recibir email 2 días       │ ✓ Email automático 48h antes vencimiento         │ MEDIA  │
│    │ de Préstamo                  │ antes / Recuerde devolver       │ ✓ Incluye título y fecha vencimiento             │
│    │                              │ a tiempo                        │ ✓ Opción renovar desde email                     │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 8  │ Hacer Reserva de Libro       │ EST: Reservar libro prestado    │ ✓ Botón "Reservar" en página libro               │ MEDIA  │
│    │                              │ / Notificación cuando disp.     │ ✓ Cola ordenada por fecha solicitud              │
│    │                              │                                 │ ✓ Email cuando disponible                        │
│    │                              │                                 │ ✓ Válida 5 días después disponible               │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 9  │ Ver Mis Préstamos Activos    │ EST: Ver libros prestados       │ ✓ Lista con portada y título                     │ MEDIA  │
│    │                              │ actualmente / Saber qué tengo   │ ✓ Fecha vencimiento de cada uno                  │
│    │                              │ y cuándo vencen                 │ ✓ Contador días que faltan                       │
│    │                              │                                 │ ✓ Botón renovación rápida                        │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 10 │ Ver Historial de Multas      │ EST: Ver multas pendientes      │ ✓ Lista con libro, fecha, monto                  │ MEDIA  │
│    │ Pendientes                   │ / Saber cuánto debo y pague     │ ✓ Opción pago integrada (TBD gateway)            │
│    │                              │ a tiempo                        │ ✓ Recibo digital post-pago                       │
│    │                              │                                 │ ✓ Se descuenta automáticamente                   │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 11 │ Bloquear Préstamos a         │ SIS: Bloquear préstamos si      │ ✓ Validación: ¿tiene deudas?                     │ MEDIA  │
│    │ Estudiante Moroso            │ tiene deudas / Asegurar cobro   │ ✓ Rechaza si deudas > 0 pesos                    │
│    │                              │ de multas                       │ ✓ Mensaje informando multa pendiente              │
│    │                              │                                 │ ✓ Desbloquea al pagar                            │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 12 │ Generar Reporte de Libros    │ DIR: Generar reporte de libros  │ ✓ Reporte: estudiante, libro, días atraso        │ BAJA   │
│    │ No Devueltos                 │ vencidos > 7 días / Contactar   │ ✓ Exportar a PDF/Excel                           │
│    │                              │ estudiantes morosos             │ ✓ Emails masivos                                 │
│    │                              │                                 │ ✓ Tiempo real                                    │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 13 │ Generar Reporte de Libros    │ DIR: Ver libros más prestados   │ ✓ Gráfico top 10 libros                          │ BAJA   │
│    │ Más Solicitados              │ / Decidir adquisiciones         │ ✓ Filtrable por carrera/facultad/período         │
│    │                              │                                 │ ✓ Tendencias vs mes anterior                     │
│    │                              │                                 │ ✓ Cantidad de estudiantes por libro              │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 14 │ Integración con Sistema      │ SIS: Verificar estudiante       │ ✓ Consulta SIAA al prestar                       │ BAJA   │
│    │ Académico (SIAA)             │ activo en universidad / No      │ ✓ Rechaza si inactivo/graduado/retirado          │
│    │                              │ prestar a graduados             │ ✓ Sincronización diaria                          │
│    │                              │                                 │ ✓ Lista blanca para excepciones                  │
├────┼──────────────────────────────┼─────────────────────────────────┼──────────────────────────────────────────────────┼────────┤
│ 15 │ Reporte de Inventario y      │ DIR: Generar reporte libros     │ ✓ Listado libros con daño/deterioro              │ BAJA   │
│    │ Condición de Libros          │ dañados / Retirar materiales    │ ✓ Campo bibliotecario que reportó                │
│    │                              │ en mal estado                   │ ✓ Foto opcional del daño                         │
│    │                              │                                 │ ✓ Estado: Activo/Dañado/Descartado               │
│    │                              │                                 │ ✓ Presupuesto de reemplazo                       │
└────┴──────────────────────────────┴─────────────────────────────────┴──────────────────────────────────────────────────┴────────┘
