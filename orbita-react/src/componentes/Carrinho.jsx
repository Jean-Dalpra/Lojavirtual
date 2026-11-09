import React from "react";
import { formatarMoeda, calcularTotal } from "../servicos/carrinho.js";
import ImagemProduto from "./ImagemProduto.jsx";

export default function Carrinho({ itens, aoAlterar, aoAvancar, aoFechar }) {
  return (
    <>
      <button className="fechar" onClick={aoFechar} aria-label="Cerrar la bolsa">
        ×
      </button>
      <p className="sobretitulo">TUS ELECCIONES</p>
      <h2 id="titulo-dialogo">Tu bolsa</h2>
      {itens.length === 0 ? (
        <div className="estado">
          <p>Tu bolsa todavía está vacía.</p>
          <button className="botao principal" onClick={aoFechar}>
            Explorar figuras
          </button>
        </div>
      ) : (
        <>
          <ul className="itens-sacola">
            {itens.map(({ produto, quantidade }) => (
              <li key={produto.id}>
                <ImagemProduto producto={produto} className="miniatura" />
                <div className="item-dados">
                  <strong>{produto.nome}</strong>
                  <span>{formatarMoeda(produto.preco_centavos)}</span>
                  <div className="quantidade">
                    <button
                      onClick={() => aoAlterar(produto.id, quantidade - 1)}
                      aria-label={`Quitar una unidad de ${produto.nome}`}
                    >
                      −
                    </button>
                    <span aria-label={`Cantidad: ${quantidade}`}>
                      {quantidade}
                    </span>
                    <button
                      disabled={quantidade >= produto.estoque}
                      onClick={() => aoAlterar(produto.id, quantidade + 1)}
                      aria-label={`Añadir una unidad de ${produto.nome}`}
                    >
                      +
                    </button>
                    <button
                      className="remover"
                      onClick={() => aoAlterar(produto.id, 0)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="resumo">
            <p>
              Envío de demostración <strong>Gratis</strong>
            </p>
            <p className="total">
              Total <strong>{formatarMoeda(calcularTotal(itens))}</strong>
            </p>
          </div>
          <p className="texto-apoio">
            No se realizará ningún cobro en esta tienda de demostración.
          </p>
          <button className="botao principal largura" onClick={aoAvancar}>
            Continuar con el pedido →
          </button>
        </>
      )}
    </>
  );
}
