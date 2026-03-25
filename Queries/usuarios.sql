CREATE DATABASE IF NOT EXISTS PoupiTech;

USE PoupiTech;

-- Armazena os usuários do sistema (login)

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,  -- armazenar hash (bcrypt)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Usuários (senha simulando hash)

INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@email.com', '$2b$10$hashjoao'),
('Maria Souza', 'maria@email.com', '$2b$10$hashmaria');


CREATE TABLE contas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome_conta VARCHAR(100) NOT NULL,
    saldo DECIMAL(15, 2) DEFAULT 0.00,
    tipo_conta ENUM('Corrente', 'Poupança', 'Investimento') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Contas

INSERT INTO contas (usuario_id, nome_conta, saldo, tipo_conta) VALUES
(1, 'Conta Corrente João', 0, 'Corrente'),
(2, 'Conta Corrente Maria', 0, 'Corrente');


CREATE TABLE sessoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    token VARCHAR(255) UNIQUE,
    expiracao DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Sessões

INSERT INTO sessoes (usuario_id, token, expiracao) VALUES
(1, 'token123', '2026-03-30 23:59:59'),
(2, 'token456', '2026-03-30 23:59:59');