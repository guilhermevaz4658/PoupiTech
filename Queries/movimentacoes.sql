-- Tabela: movimentações (transações) - Guarda todas as receitas e despesas 

CREATE TABLE movimentacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    conta_id INT NOT NULL,
    categoria_id INT,
    descricao VARCHAR(255),
    valor DECIMAL(10,2) NOT NULL,
    data DATE NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);


-- Inserindo movimentações
-- João (usuario_id = 1)
INSERT INTO movimentacoes 
(usuario_id, conta_id, categoria_id, descricao, valor, data)
VALUES
(1, 1, 1, 'Salário', 3000, '2026-03-01'),
(1, 1, 2, 'Freelance site', 800.00, '2026-03-05'),
(1, 1, 3, 'Supermercado', 250.00, '2026-03-06'),
(1, 1, 4, 'Uber', 60.00, '2026-03-07'),
(1, 1, 5, 'Cinema', 45.00, '2026-03-10'),
(1, 1, 3, 'Restaurante', 120.00, '2026-03-12');

-- Maria (usuario_id = 2)
INSERT INTO movimentacoes 
(usuario_id, conta_id, categoria_id, descricao, valor, data)
VALUES
(2, 2, 6, 'Salário mensal', 4000.00, '2026-03-01'),
(2, 2, 7, 'Dividendos', 500.00, '2026-03-08'),
(2, 2, 8, 'Compras mercado', 300.00, '2026-03-09'),
(2, 2, 9, 'Plano academia', 120.00, '2026-03-11');