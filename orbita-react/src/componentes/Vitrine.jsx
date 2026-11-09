import React, { useEffect, useState } from "react";
import CartaoProduto from "./CartaoProduto.jsx";
import ImagemProduto from "./ImagemProduto.jsx";

export default function Vitrine({
  produtos,
  carregando,
  erro,
  aoRecarregar,
  aoAdicionar,
  aoDetalhar,
}) {
  const [busca, definirBusca] = useState("");
  const [categoria, definirCategoria] = useState("Todas");
  const [idDestacado, definirIdDestacado] = useState(null);
  const categorias = ["Todas", "Guardianes", "Maestros", "Rivales"];

  useEffect(() => {
    if (produtos.length && idDestacado === null) {
      const indiceAleatorio = Math.floor(Math.random() * produtos.length);
      definirIdDestacado(produtos[indiceAleatorio].id);
    }
  }, [produtos, idDestacado]);

  const visiveis = produtos.filter(
    (produto) =>
      (categoria === "Todas" || produto.categoria === categoria) &&
      produto.nome
        .toLocaleLowerCase("es")
        .includes(busca.toLocaleLowerCase("es")),
  );
  const destacado = produtos.find((produto) => produto.id === idDestacado)
    ?? produtos[0]
    ?? {
      id: null,
      nome: "Centinela del Alba",
      desenho: "figura1",
      cor: "#f28a24",
      descricao: "Un guardián tallado para nuevas aventuras.",
    };

  return (
    <>
      <section className="abertura">
        <div className="abertura-texto">
          <p className="sobretitulo">
            <span /> FIGURAS CON CORAZÓN
          </p>
          <h1>
            Otro mundo.
            <br />
            Una nueva
            <br />
            <em>leyenda.</em>
          </h1>
          <p>
            Guerreros, maestros y guardianes.
            <br />
            Encuentra tu próxima figura favorita.
          </p>
          <a href="#catalogo" className="botao principal">
            Explorar la colección <span>↗</span>
          </a>
          <div className="nota-abertura">
            COLECCIÓN DE FANTASÍA{" "}
            <span>No se realizan cobros reales.</span>
          </div>
        </div>
        <div className="abertura-visual">
          <div className="orbita-decorativa" />
          <span className="rotulo-visual">BOLAS DE DRAGÓN / 01</span>
          <ImagemProduto
            producto={destacado}
            className="imagen-destacada"
            grande
          />
          <div className="destaque-produto">
            <div>
              <small>FIGURA DESTACADA</small>
              <strong>{destacado.nome}</strong>
              <span>{destacado.descricao}</span>
            </div>
            <button
              aria-label={`Ver ${destacado.nome}`}
              onClick={() => aoDetalhar(destacado.id)}
            >
              ↗
            </button>
          </div>
          <span className="selo">
            Nuevos mundos.
            <br />
            Nuevas historias.
          </span>
        </div>
      </section>

      <div className="beneficios">
        <p>
          <b>01</b> Personajes originales
        </p>
        <p>
          <b>02</b> Tu colección, en pocos pasos
        </p>
        <p>
          <b>03</b> Pago de demostración
        </p>
      </div>

      <section id="catalogo" className="catalogo">
        <div className="titulo-catalogo">
          <div>
            <p className="sobretitulo">ELIGE A TU PRÓXIMO COMPAÑERO</p>
            <h2>Figuras para historias extraordinarias.</h2>
          </div>
          <span>{visiveis.length} figuras</span>
        </div>
        <div className="ferramentas">
          <div className="categorias" aria-label="Filtrar por categoría">
            {categorias.map((item) => (
              <button
                key={item}
                aria-pressed={categoria === item}
                onClick={() => definirCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="busca">
            <span>Buscar</span>
            <input
              value={busca}
              onChange={(evento) => definirBusca(evento.target.value)}
              placeholder="¿Qué figura buscas?"
              type="search"
            />
          </label>
        </div>
        {carregando ? (
          <p role="status" className="estado">
            Cargando la colección…
          </p>
        ) : erro ? (
          <div role="alert" className="estado erro">
            <p>{erro}</p>
            <button className="botao" onClick={aoRecarregar}>
              Intentar de nuevo
            </button>
          </div>
        ) : visiveis.length ? (
          <div className="grade-produtos">
            {visiveis.map((produto) => (
              <CartaoProduto
                key={produto.id}
                produto={produto}
                aoAdicionar={aoAdicionar}
                aoDetalhar={aoDetalhar}
              />
            ))}
          </div>
        ) : (
          <p role="status" className="estado">
            No encontramos figuras. Prueba con otro nombre o categoría.
          </p>
        )}
      </section>
    </>
  );
}
