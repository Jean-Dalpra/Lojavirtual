import React from "react";

export default function Cabecalho({ quantidade, aoAbrirCarrinho }) {
  return (
    <>
      <div className="faixa">
        FIGURAS DE COLECCIÓN <span>Héroes de mundos originales</span>
        <a href="/material.html">Conoce el proyecto ↗</a>
      </div>
      <header className="cabecalho">
        <a className="marca" href="/" aria-label="Bolas de Dragón, inicio">
          <span className="simbolo">★</span>Bolas de Dragón
          <span className="marca-pequena">Figuras forjadas en batalla</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo">Explorar figuras</a>
          <a href="/apresentacao.html">El proyecto ↗</a>
          <button className="botao-carrinho" onClick={aoAbrirCarrinho}>
            Bolsa <span>{quantidade}</span>
          </button>
        </nav>
      </header>
    </>
  );
}
