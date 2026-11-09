USE orbita_simples;

SET @coluna_imagem_existe = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'produtos'
      AND COLUMN_NAME = 'imagem'
);

SET @sql_migracao = IF(
    @coluna_imagem_existe = 0,
    'ALTER TABLE produtos ADD COLUMN imagem VARCHAR(255) NULL',
    'SELECT ''La columna imagen ya existe.'' AS mensaje'
);

PREPARE migracao_imagens FROM @sql_migracao;
EXECUTE migracao_imagens;
DEALLOCATE PREPARE migracao_imagens;

UPDATE produtos SET imagem = 'centinela-del-alba.webp' WHERE id = 1;
UPDATE produtos SET imagem = 'maestra-de-la-bruma.webp' WHERE id = 2;
UPDATE produtos SET imagem = 'guardian-de-jade.webp' WHERE id = 3;
UPDATE produtos SET imagem = 'rival-carmesi.webp' WHERE id = 4;
UPDATE produtos SET imagem = 'exploradora-estelar.webp' WHERE id = 5;
UPDATE produtos SET imagem = 'titan-de-obsidiana.webp' WHERE id = 6;
UPDATE produtos SET imagem = 'aprendiz-del-viento.webp' WHERE id = 7;
UPDATE produtos SET imagem = 'vigia-de-cristal.webp' WHERE id = 8;
UPDATE produtos SET imagem = 'maestro-del-horizonte.webp' WHERE id = 9;
UPDATE produtos SET imagem = 'sombra-errante.webp' WHERE id = 10;
