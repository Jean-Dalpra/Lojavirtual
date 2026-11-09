# Imágenes de la colección

Guarda aquí una imagen por figura. La tienda espera imágenes WebP con estos
nombres de muestra:

- `centinela-del-alba.webp`
- `maestra-de-la-bruma.webp`
- `guardian-de-jade.webp`
- `rival-carmesi.webp`
- `exploradora-estelar.webp`
- `titan-de-obsidiana.webp`
- `aprendiz-del-viento.webp`
- `vigia-de-cristal.webp`
- `maestro-del-horizonte.webp`
- `sombra-errante.webp`

Puedes usar tus propios nombres y formatos compatibles con el navegador.
Actualiza el nombre correspondiente en la columna `imagem` de la tabla
`productos` en phpMyAdmin. Guarda solo el nombre del archivo, no la ruta.

La columna se añadió en `backend/banco/estrutura.sql` para instalaciones nuevas.
Si ya tenías la base de datos, importa una vez
`backend/banco/migracao_imagens.sql`. Si un archivo no existe o no tiene un
nombre asignado, se muestra la ilustración de respaldo.
