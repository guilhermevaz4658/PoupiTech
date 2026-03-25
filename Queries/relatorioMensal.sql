-- Relatório mensal 
SELECT 
    DATE_FORMAT(data, '%Y-%m') AS mes,
    c.tipo,
    SUM(m.valor) AS total
FROM movimentacoes m
JOIN categorias c ON m.categoria_id = c.id
WHERE m.usuario_id = 1
GROUP BY mes, c.tipo
ORDER BY mes;