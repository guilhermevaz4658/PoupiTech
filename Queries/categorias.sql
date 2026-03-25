-- Tabela: categorias - Serve para organizar receitas e despesas

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
   tipo ENUM('receita', 'despesa') NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserindo categorias - Cada usuário tem suas próprias categorias

-- Categorias do João (id = 1)
INSERT INTO categorias (usuario_id, nome, tipo) VALUES
(1, 'Salário', 'receita'),
(1, 'Freelance', 'receita'),
(1, 'Alimentação', 'despesa'),
(1, 'Transporte', 'despesa'),
(1, 'Lazer', 'despesa');

-- Categorias da Maria (id = 2)
INSERT INTO categorias (usuario_id, nome, tipo) VALUES
(2, 'Salário', 'receita'),
(2, 'Investimentos', 'receita'),
(2, 'Mercado', 'despesa'),
(2, 'Academia', 'despesa');