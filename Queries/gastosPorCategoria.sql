-- Gastos por categoria

SELECT 
    c.nome,
    SUM(m.valor) AS total
FROM movimentacoes m
JOIN categorias c ON m.categoria_id = c.id
WHERE c.tipo = 'despesa'
  AND m.usuario_id = 1
GROUP BY c.nome
ORDER BY total DESC;