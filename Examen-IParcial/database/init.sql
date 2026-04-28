-- ============================
-- TABLA: puestos
-- ============================
-- Representa el organigrama.
-- La relación parent_id permite recursividad infinita.

CREATE TABLE puestos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    parent_id INT NULL,
    descripcion TEXT,

    CONSTRAINT fk_puesto_padre
        FOREIGN KEY (parent_id)
        REFERENCES puestos(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_puestos_parent_id ON puestos(parent_id);

-- ============================
-- TABLA: usuarios
-- ============================
-- Cada usuario ocupa un puesto dentro del organigrama.

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    puesto_id INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_usuario_puesto
        FOREIGN KEY (puesto_id)
        REFERENCES puestos(id)
        ON DELETE RESTRICT
);

-- ============================
-- TABLA: eventos_calendario
-- ============================
-- Eventos asociados a usuarios o puestos.

CREATE TABLE eventos_calendario (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,

    fecha_inicio TIMESTAMP NOT NULL,
    duracion_minutos INT NOT NULL CHECK (duracion_minutos > 0),

    estado VARCHAR(30) NOT NULL CHECK (
        estado IN ('programado', 'completado', 'cancelado')
    ),

    usuario_id INT NULL,
    puesto_id INT NULL,

    CONSTRAINT fk_evento_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_evento_puesto
        FOREIGN KEY (puesto_id)
        REFERENCES puestos(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_eventos_fecha_inicio ON eventos_calendario(fecha_inicio);
