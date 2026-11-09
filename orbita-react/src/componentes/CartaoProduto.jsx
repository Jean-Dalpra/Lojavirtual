import React from "react";
import ImagemProduto from "./ImagemProduto.jsx";
import { formatarMoeda } from "../servicos/carrinho.js";

export default function CartaoProduto({ produto, aoAdicionar, aoDetalhar }) {
  return (
    <article className="cartao-produto">
      <button
        className="imagem-produto"
        onClick={() => aoDetalhar(produto.id)}
        aria-label={`Ver detalhes de ${produto.nome}`}
        style={{ background: produto.cor + "44" }}
      >
        <ImagemProduto producto={produto} className="imagen-producto-contenedor" />
        <span className="etiqueta">
          {produto.estoque === 0 ? "Agotado" : produto.categoria}
        </span>
        <span className="seta-detalhe">↗</span>
      </button>
      <div className="produto-info">
        <button className="nome-produto" onClick={() => aoDetalhar(produto.id)}>
          {produto.nome}
        </button>
        <p>
          {produto.categoria} <span>• {produto.estoque} disponibles</span>
        </p>
        <div className="preco-linha">
          <strong>{formatarMoeda(produto.preco_centavos)}</strong>
          <button
            className="adicionar"
            disabled={!produto.estoque}
            onClick={() => aoAdicionar(produto)}
            aria-label={`Añadir ${produto.nome} a la bolsa`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
