import React, { useState } from "react";
import {
  criarPedido,
  simularPagamento,
  consultarPedido,
} from "../servicos/api.js";
import { formatarMoeda, calcularTotal } from "../servicos/carrinho.js";

export default function Finalizacao({ itens, aoConcluir, aoVoltar, aoFechar }) {
  const [nome, definirNome] = useState("");
  const [email, definirEmail] = useState("");
  const [pedido, definirPedido] = useState(null);
  const [ocupado, definirOcupado] = useState(false);
  const [erro, definirErro] = useState("");

  async function enviarPedido(evento) {
    evento.preventDefault();
    definirOcupado(true);
    definirErro("");
    try {
      const novo = await criarPedido({
        nome,
        email,
        itens: itens.map((item) => ({
          produto_id: item.produto.id,
          quantidade: item.quantidade,
        })),
      });
      definirPedido(novo);
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }

  async function pagar(resultado) {
    definirOcupado(true);
    definirErro("");
    try {
      const atualizado = await simularPagamento(pedido.codigo, resultado);
      definirPedido(atualizado);
      if (atualizado.status === "pago") aoConcluir();
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }

  async function recuperar() {
    definirOcupado(true);
    definirErro("");
    try {
      const atualizado = await consultarPedido(pedido.codigo);
      definirPedido(atualizado);
      if (atualizado.status === "pago") aoConcluir();
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }

  return (
    <>
      <button
        className="fechar"
        disabled={ocupado}
        onClick={aoFechar}
        aria-label="Cerrar el pedido"
      >
        ×
      </button>
      <p className="sobretitulo">
        {pedido?.status === "pago"
          ? "PEDIDO COMPLETADO"
          : pedido
            ? "PASO 2 DE 2 / PAGO"
            : "PASO 1 DE 2 / TUS DATOS"}
      </p>
      <h2 id="titulo-dialogo">
        {pedido?.status === "pago"
          ? "Tu pedido está listo."
          : pedido
            ? "¿Probamos el pago?"
            : "Ya casi terminamos."}
      </h2>
      <p className="aviso-simulacao">
        Entorno de demostración. Usa datos ficticios. No introduzcas tarjetas,
        documentos ni contraseñas.
      </p>
      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}
      {!pedido ? (
        <form onSubmit={enviarPedido}>
          <label className="campo">
            Nombre
            <input
              autoComplete="off"
              required
              maxLength="100"
              value={nome}
              onChange={(evento) => definirNome(evento.target.value)}
              placeholder="Nombre de ejemplo"
            />
          </label>
          <label className="campo">
            Correo electrónico
            <input
              autoComplete="off"
              type="email"
              required
              maxLength="150"
              value={email}
              onChange={(evento) => definirEmail(evento.target.value)}
              placeholder="persona@ejemplo.com"
            />
          </label>
          <div className="resumo">
            <p>
              {itens.reduce((soma, item) => soma + item.quantidade, 0)} unidades{" "}
              <strong>{formatarMoeda(calcularTotal(itens))}</strong>
            </p>
            <p className="texto-apoio">
              El servidor confirma el precio y las existencias.
            </p>
          </div>
          <button
            disabled={ocupado || !itens.length}
            className="botao principal largura"
          >
            {ocupado ? "Creando el pedido…" : "Crear pedido →"}
          </button>
          <button type="button" className="botao-texto" onClick={aoVoltar}>
            Volver a la bolsa
          </button>
        </form>
      ) : (
        <div>
          <p className="codigo-pedido">
            Código del pedido <code>{pedido.codigo}</code>
          </p>
          <ul className="lista-resumo">
            {pedido.itens.map((item) => (
              <li key={item.produto_id}>
                {item.quantidade} × {item.nome}
                <strong>
                  {formatarMoeda(item.preco_centavos * item.quantidade)}
                </strong>
              </li>
            ))}
          </ul>
          <p className="total">
            Total confirmado{" "}
            <strong>{formatarMoeda(pedido.total_centavos)}</strong>
          </p>
          {pedido.status === "pago" ? (
            <>
              <p className="sucesso" role="status">
                Pago de demostración aprobado. ¡Pedido registrado!
              </p>
              <button className="botao principal largura" onClick={aoFechar}>
                Volver a la tienda
              </button>
            </>
          ) : (
            <>
              {pedido.status === "recusado" && (
                <p className="erro" role="status">
                  La simulación fue rechazada. Puedes volver a intentarlo con el mismo pedido.
                </p>
              )}
              <p className="texto-apoio">
                Elige el resultado de la simulación. Este ejemplo no se conecta
                con ningún banco.
              </p>
              <button
                disabled={ocupado}
                className="botao principal largura"
                onClick={() => pagar("aprovado")}
              >
                {ocupado ? "Procesando…" : "Simular aprobación"}
              </button>
              <button
                disabled={ocupado}
                className="botao secundaria largura"
                onClick={() => pagar("recusado")}
              >
                Simular rechazo
              </button>
              <button
                disabled={ocupado}
                className="botao-texto"
                onClick={recuperar}
              >
                Consultar el estado del pedido
              </button>
              <p className="texto-apoio">
                Si hay un error de conexión, consulta el estado antes de volver
                a intentarlo.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
