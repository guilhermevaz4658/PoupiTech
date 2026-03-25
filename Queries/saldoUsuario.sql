-- Saldo do usuário

SELECT 
    u.nome,
    SUM(
        CASE 
            WHEN c.tipo = 'receita' THEN m.valor
            ELSE -m.valor
        END
    ) AS saldo
FROM usuarios u
LEFT JOIN movimentacoes m ON u.id = m.usuario_id
LEFT JOIN categorias c ON m.categoria_id = c.id
WHERE u.id = 1
GROUP BY u.nome;