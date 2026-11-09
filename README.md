# Forja Celeste · Tienda de figuras

Tienda de demostración con React, API PHP y MySQL. Incluye figuras ficticias y
personajes originales; no se realizan cobros reales.

## Cómo iniciar el proyecto

1. Instala Node.js 22.12 o posterior.
2. Inicia Apache y MySQL desde el panel de XAMPP.
3. En phpMyAdmin, importa `backend/banco/estrutura.sql` y después
   `backend/banco/produtos.sql`. El segundo archivo actualiza los registros de
   muestra con `id` del 1 al 10, por lo que también puedes volver a importarlo
   para actualizar la colección de demostración.
   Si ya tenías la base de datos creada, importa una vez
   `backend/banco/migracao_imagens.sql` antes de actualizar `produtos.sql`.
4. Comprueba que `.env` contiene la dirección base de la API. Para esta
   estructura, usa `http://localhost/Lojavirtual/backend`.
5. Abre una terminal en esta carpeta y ejecuta:

```powershell
npm install
npm run dev
```

6. Abre la dirección que indique Vite, normalmente `http://localhost:5173`.

No abras `index.html` con doble clic. Si cambias `.env` mientras Vite está en
marcha, detenlo con `Ctrl+C` y vuelve a ejecutar `npm run dev`.

Para generar la versión de producción, ejecuta `npm run build`.

## Imágenes de las figuras

Guarda una imagen por figura en `public/images`. La API guarda el nombre del
archivo en la columna `imagem` y React carga los archivos desde esa carpeta.
Consulta `public/images/README.md` para ver los nombres de muestra y cómo
asignar otros archivos. Si falta una imagen, se muestra la ilustración original
como alternativa.
