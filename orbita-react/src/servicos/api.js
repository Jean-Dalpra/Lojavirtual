const enderecoApi = (import.meta.env.VITE_ENDERECO_API
    ?? 'http://localhost/Lojavirtual/backend').replace(/\/$/, '');

async function requisitar(caminho, opcoes = {}) {
    let resposta;

    try {
        resposta = await fetch(`${enderecoApi}${caminho}`, {
            ...opcoes,
            headers: {
                ...(opcoes.body ? {'Content-Type': 'application/json'} : {}),
                ...opcoes.headers,
            },
        });
    } catch (erro) {
        if (erro.name === 'AbortError') {
            throw erro;
        }
        throw new Error('No se pudo conectar con la API. Comprueba la dirección y que Apache esté en ejecución.');
    }

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(dados.mensagem ?? `Error HTTP ${resposta.status}.`);
    }

    return dados;
}

export const listarCategorias = () =>
    requisitar('/api/categorias.php');

export const listarProdutos = (sinal) =>
    requisitar('/api/produtos.php', {signal: sinal});

export const buscarProduto = (id) =>
    requisitar(`/api/produtos.php?id=${encodeURIComponent(id)}`);

export const criarPedido = (dados) =>
    requisitar('/api/pedidos.php', {
        method: 'POST',
        body: JSON.stringify(dados),
    });

export const consultarPedido = (codigo) =>
    requisitar(`/api/pedidos.php?codigo=${encodeURIComponent(codigo)}`);

export const simularPagamento = (codigo, resultado) =>
    requisitar(`/api/pagamentos.php?codigo=${encodeURIComponent(codigo)}`, {
        method: 'POST',
        body: JSON.stringify({resultado}),
    });
