import React, { useEffect, useState } from "react";
import DesenhoProduto from "./DesenhoProduto.jsx";

export default function ImagemProduto({
  producto,
  className = "",
  style,
  grande = false,
}) {
  const src = producto.imagem
    ? `/images/${encodeURIComponent(producto.imagem)}`
    : "";
  const [fallo, definirFallo] = useState(false);

  useEffect(() => {
    definirFallo(false);
  }, [src]);

  return (
    <div className={className} style={style}>
      {src && !fallo ? (
        <img
          className="imagen-producto"
          src={src}
          alt={producto.nome}
          onError={() => definirFallo(true)}
        />
      ) : (
        <div className="ilustracion-fallback" role="img" aria-label={producto.nome}>
          <DesenhoProduto
            tipo={producto.desenho}
            cor={producto.cor}
            grande={grande}
          />
        </div>
      )}
    </div>
  );
}
