<?php
header("Content-Type: application/json; charset=utf-8");
$caminho = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

if (!str_ends_with($caminho, "/") && basename($caminho) !== "index.php") {
    http_response_code(404);
    echo json_encode(["mensaje" => "No se encontró el endpoint."], JSON_UNESCAPED_UNICODE);
    exit();
}

echo json_encode(
    [
        "proyecto" => "Forja Celeste API",
        "rotas" => [
            "api/categorias.php",
            "api/produtos.php",
            "api/produtos.php?id=1",
            "api/produtos.php?categoria_id=1",
            "api/pedidos.php",
            "api/pagamentos.php?codigo=CODIGO",
        ],
    ],
    JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT,
);
