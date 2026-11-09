import React from "react";
import ImagemProduto from "./ImagemProduto.jsx";
import { formatarMoeda } from "../servicos/carrinho.js";

export default function DetalheProduto({ produto, aoAdicionar, aoFechar }) {
  return (
    <>
      <button
        className="fechar"
        onClick={aoFechar}
        aria-label="Cerrar detalles"
      >
        ×
      </button>
      <ImagemProduto
        producto={produto}
        className="detalhe-imagem"
        style={{ background: produto.cor + "55" }}
      />
      <p className="sobretitulo">{produto.categoria}</p>
      <h2 id="titulo-dialogo">{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <p>{produto.estoque} unidades disponibles</p>
      <p className="total">{formatarMoeda(produto.preco_centavos)}</p>
      <button
        disabled={!produto.estoque}
        className="botao principal largura"
        onClick={() => {
          aoAdicionar(produto);
          aoFechar();
        }}
      >
        Añadir a la bolsa
      </button>
    </>
  );
}
