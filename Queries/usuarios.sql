CREATE DATABASE IF NOT EXISTS PoupiTech;

USE PoupiTech;

-- Armazena os usuários do sistema (login)

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo usuários

INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@email.com', '123456'),
('Maria Souza', 'maria@email.com', '123456');