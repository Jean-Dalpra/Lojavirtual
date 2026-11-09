# Forja Celeste · Loja de figuras

Loja de demonstração desenvolvida com React, uma API em PHP e MySQL. Inclui figuras fictícias e personagens originais; não são realizadas transações reais.

## Como iniciar o projeto

1. Instale o Node.js 22.12 ou uma versão posterior.
2. Inicie o Apache e o MySQL a partir do painel de controle do XAMPP.
3. No phpMyAdmin, importe o arquivo `backend/bank/structure.sql` e, em seguida, o `backend/banco/produtos.sql`. O segundo arquivo atualiza os registros de exemplo (com `id` de 1 a 10); você pode importá-lo novamente caso deseje atualizar a coleção de demonstração.
   Se o banco de dados já tiver sido criado, é necessário executar o arquivo `backend/banco/migracao_imagens.sql` antes de atualizar o `produtos.sql`.
4. Certifique-se de que o arquivo `.env` contenha o endereço base da API. Para esta estrutura, utilize `http://localhost/Lojavirtual/backend`.
5. Abra um terminal nesta pasta e execute:

```powershell
npm install
npm run dev
```

6. Acesse o endereço indicado pelo Vite, geralmente `http://localhost:5173`.

Não abra o arquivo `index.html` com um clique duplo. Se você modificar o arquivo `.env` enquanto o Vite estiver em execução, interrompa o processo com `Ctrl+C` e execute `npm run dev` novamente.

Para gerar a versão de produção, execute `npm run build`.

## Imagens das figuras

Salve uma imagem para cada figura na pasta `public/images`. A API armazena o nome do arquivo na coluna `image`, e o React carrega os arquivos a partir dessa pasta. Consulte o arquivo `public/images/README.md` para ver exemplos de nomes de arquivo e como atribuir novos nomes. Caso uma imagem esteja faltando, a ilustração original será exibida como alternativa.

------------------------------------------------------------------------------------------------------------------------------------------------

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
