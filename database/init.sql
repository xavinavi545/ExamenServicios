-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

-- Crear el usuario 'admin' con permisos globales
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin';

-- Otorgar todos los privilegios al usuario 'admin'
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación usuario-rol (Muchos a Muchos)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Insertar roles por defecto si no existen
INSERT INTO roles (name)
SELECT 'admin' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'admin')
UNION
SELECT 'user' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'user');

-- Insertar el usuario 'xavier' si no existe
INSERT INTO users (username, email, password_hash)
SELECT 'xavier', 'pruebasdepracticas52@gmail.com', '$2a$10$6s6Q/0HpeZI2C5tP/6mKxeyvVQgLjOGUeUeztXwOF1lHk/zZWGJ3W'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'pruebasdepracticas52@gmail.com');

-- Asignar el rol de 'admin' al usuario 'xavier'
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id 
FROM users u, roles r 
WHERE u.email = 'pruebasdepracticas52@gmail.com' AND r.name = 'admin'
ON DUPLICATE KEY UPDATE user_id = user_id;

-- Insertar usuarios de prueba con contraseñas encriptadas (bcrypt)
INSERT INTO users (username, email, password_hash) 
SELECT 'admin', 'admin@example.com', '$2a$10$Yz5G0zJvfhDEnw/dZhP1CufU3OY/noy4GfPnwpVZX92G6Av1S26rO' 
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');

INSERT INTO users (username, email, password_hash) 
SELECT 'jose', 'jose@example.com', '$2a$10$Yz5G0zJvfhDEnw/dZhP1CufU3OY/noy4GfPnwpVZX92G6Av1S26rO' 
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'jose@example.com');

INSERT INTO users (username, email, password_hash) 
SELECT 'maria', 'maria@example.com', '$2a$10$Yz5G0zJvfhDEnw/dZhP1CufU3OY/noy4GfPnwpVZX92G6Av1S26rO' 
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'maria@example.com');

-- Asignar roles a los usuarios (admin y user)
INSERT INTO user_roles (user_id, role_id) 
SELECT 1, 1 WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 1 AND role_id = 1);

INSERT INTO user_roles (user_id, role_id) 
SELECT 2, 2 WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 2 AND role_id = 2);

INSERT INTO user_roles (user_id, role_id) 
SELECT 3, 2 WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = 3 AND role_id = 2);
