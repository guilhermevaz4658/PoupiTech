-- Tabela: movimentações (transações) - Guarda todas as receitas e despesas 

CREATE TABLE movimentacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria_id INT,
    tipo VARCHAR(10) NOT NULL, -- 'receita' ou 'despesa'
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
(usuario_id, categoria_id, tipo, descricao, valor, data)
VALUES
(1, 1, 'receita', 'Salário', 3000, '2026-03-01'),
(1, 2, 'receita', 'Freelance site', 800.00, '2026-03-05'),
(1, 3, 'despesa', 'Supermercado', 250.00, '2026-03-06'),
(1, 4, 'despesa', 'Uber', 60.00, '2026-03-07'),
(1, 5, 'despesa', 'Cinema', 45.00, '2026-03-10'),
(1, 3, 'despesa', 'Restaurante', 120.00, '2026-03-12');

-- Maria (usuario_id = 2)
INSERT INTO movimentacoes (usuario_id, categoria_id, tipo, descricao, valor, data) VALUES
(2, 6, 'receita', 'Salário mensal', 4000.00, '2026-03-01'),
(2, 7, 'receita', 'Dividendos', 500.00, '2026-03-08'),
(2, 8, 'despesa', 'Compras mercado', 300.00, '2026-03-09'),
(2, 9, 'despesa', 'Plano academia', 120.00, '2026-03-11');