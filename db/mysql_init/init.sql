CREATE DATABASE tareas;
USE tareas;

-- Crear la tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    usuario_nombre VARCHAR(100) NOT NULL,
    contrasenia VARCHAR(100) NOT NULL
);

-- Crear la tabla de tareas
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_vencimiento DATE,
    estado ENUM('Pendiente', 'En progreso', 'Completada') NOT NULL DEFAULT 'Pendiente',
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


INSERT INTO usuarios (nombre, apellido, fecha_nacimiento, correo_electronico, usuario_nombre, contrasenia)
VALUES 
('Juan', 'Pérez', '1985-06-15', 'juan.perez@example.com', 'juanp', 'contrasenia123'),
('Ana', 'Gómez', '1990-08-22', 'ana.gomez@example.com', 'anag', 'password456'),
('Carlos', 'Sánchez', '1982-11-30', 'carlos.sanchez@example.com', 'carloss', '1234password'),
('Laura', 'Martínez', '1995-03-12', 'laura.martinez@example.com', 'lauram', 'pass789');


INSERT INTO tareas (descripcion, fecha_creacion, fecha_vencimiento, estado, usuario_id)
VALUES 
('Revisar el informe mensual', '2024-07-20', '2024-07-25', 'Pendiente', 1),
('Actualizar la presentación del proyecto', '2024-07-18', '2024-07-23', 'En progreso', 2),
('Organizar la reunión de equipo', '2024-07-15', '2024-07-22', 'Completada', 1),
('Preparar la propuesta de presupuesto', '2024-07-17', '2024-07-30', 'Pendiente', 3),
('Realizar pruebas de la nueva funcionalidad', '2024-07-19', '2024-07-26', 'Pendiente', 4);