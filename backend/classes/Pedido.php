<?php
class Pedido
{
    private $conexao;
    private $produtos;

    public function __construct()
    {
        $this->conexao = Conexao::conectar();
        $this->produtos = new Produto();
        $this->produtos->usarConexao($this->conexao);
    }

    public function criar(array $dados): array
    {
        $nome = is_string($dados["nome"] ?? null) ? trim($dados["nome"]) : "";
        $email = is_string($dados["email"] ?? null) ? trim($dados["email"]) : "";
        $itens = $dados["itens"] ?? null;
        if (
            $nome === "" ||
            strlen($nome) > 100 ||
            strlen($email) > 150 ||
            !filter_var($email, FILTER_VALIDATE_EMAIL)
        ) {
            throw new ErroHttp("Introduce un nombre y un correo electrónico válidos.", 422);
        }
        if (
            !is_array($itens) ||
            !array_is_list($itens) ||
            count($itens) < 1 ||
            count($itens) > 20
        ) {
            throw new ErroHttp("El pedido debe incluir entre 1 y 20 artículos.", 422);
        }
        $identificadores = [];
        $itensValidados = [];
        $total = 0;
        foreach ($itens as $item) {
            if (
                !is_array($item) ||
                !is_int($item["produto_id"] ?? null) ||
                !is_int($item["quantidade"] ?? null) ||
                $item["produto_id"] < 1 ||
                $item["quantidade"] < 1 ||
                $item["quantidade"] > 99
            ) {
                throw new ErroHttp(
                    "El identificador del producto y la cantidad deben ser números enteros válidos; máximo 99 unidades por artículo.",
                    422,
                );
            }
            if (isset($identificadores[$item["produto_id"]])) {
                throw new ErroHttp("No repitas un producto en el mismo pedido.", 422);
            }
            $identificadores[$item["produto_id"]] = true;
            $produto = $this->produtos->buscar($item["produto_id"]);
            if ($produto["estoque"] < $item["quantidade"]) {
                throw new ErroHttp("No hay existencias suficientes de " . $produto["nome"] . ".", 409);
            }
            $total += $produto["preco_centavos"] * $item["quantidade"];
            $itensValidados[] = ["produto" => $produto, "quantidade" => $item["quantidade"]];
        }
        $codigo = bin2hex(random_bytes(16));
        $this->conexao->beginTransaction();
        try {
            $consulta = $this->conexao->prepare(
                "INSERT INTO pedidos (codigo, nome, email, total_centavos, status) VALUES (?, ?, ?, ?, ?)",
            );
            $consulta->execute([$codigo, $nome, $email, $total, "pendente"]);
            $identificadorPedido = (int) $this->conexao->lastInsertId();
            $consultaItem = $this->conexao->prepare(
                "INSERT INTO itens_pedido (pedido_id, produto_id, nome, preco_centavos, quantidade) VALUES (?, ?, ?, ?, ?)",
            );
            foreach ($itensValidados as $item) {
                $produto = $item["produto"];
                $consultaItem->execute([
                    $identificadorPedido,
                    $produto["id"],
                    $produto["nome"],
                    $produto["preco_centavos"],
                    $item["quantidade"],
                ]);
            }
            $this->conexao->commit();
        } catch (Throwable $erro) {
            if ($this->conexao->inTransaction()) {
                $this->conexao->rollBack();
            }
            throw $erro;
        }
        return $this->consultar($codigo);
    }

    public function consultar(string $codigo): array
    {
        $consulta = $this->conexao->prepare(
            "SELECT id, codigo, nome, email, total_centavos, status FROM pedidos WHERE codigo = ?",
        );
        $consulta->execute([$codigo]);
        $pedido = $consulta->fetch();
        if (!$pedido) {
            throw new ErroHttp("No se encontró el pedido.", 404);
        }
        $consultaItens = $this->conexao->prepare(
            "SELECT produto_id, nome, preco_centavos, quantidade FROM itens_pedido WHERE pedido_id = ? ORDER BY produto_id",
        );
        $consultaItens->execute([$pedido["id"]]);
        $pedido["itens"] = array_map(function (array $item): array {
            $item["produto_id"] = (int) $item["produto_id"];
            $item["preco_centavos"] = (int) $item["preco_centavos"];
            $item["quantidade"] = (int) $item["quantidade"];
            return $item;
        }, $consultaItens->fetchAll());
        $pedido["total_centavos"] = (int) $pedido["total_centavos"];
        unset($pedido["id"]);
        return $pedido;
    }
}
