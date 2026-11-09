USE orbita_simples;
INSERT INTO categorias (id, nome) VALUES (1, 'Guardianes'), (2, 'Maestros'), (3, 'Rivales')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO produtos (id,nome,categoria_id,preco_centavos,estoque,desenho,cor,descricao,imagem) VALUES
(1,'Centinela del Alba',1,24990,12,'figura1','#88a99a','Figura de colección pintada a mano. Este guardián protege los caminos entre mundos con serenidad y valor.','centinela-del-alba.webp'),
(2,'Maestra de la Bruma',2,32990,8,'figura2','#c6a9da','Una instructora paciente que domina técnicas antiguas. Pieza original con detalles inspirados en la niebla y las montañas.','maestra-de-la-bruma.webp'),
(3,'Guardián de Jade',1,12990,20,'figura3','#9ebc6d','Defensor de los valles celestes, reconocido por su disciplina y su armadura de tonos verdes.','guardian-de-jade.webp'),
(4,'Rival Carmesí',3,18990,15,'figura1','#c77968','Competidor audaz que nunca retrocede ante un desafío. Figura ficticia para ampliar tu colección.','rival-carmesi.webp'),
(5,'Exploradora Estelar',1,15990,9,'figura2','#e1b86d','Viajera de sistemas lejanos con una capa de exploración y una curiosidad sin límites.','exploradora-estelar.webp'),
(6,'Titán de Obsidiana',3,119990,5,'figura3','#8d91a5','Una imponente figura de edición especial, con armadura oscura y acabados metálicos.','titan-de-obsidiana.webp'),
(7,'Aprendiz del Viento',2,21990,10,'figura1','#79a9c2','Joven artista marcial que entrena para escuchar el viento y moverse con ligereza.','aprendiz-del-viento.webp'),
(8,'Vigía de Cristal',1,9990,18,'figura2','#8ec9c5','Centinela de las torres translúcidas; sus colores evocan antiguos minerales luminosos.','vigia-de-cristal.webp'),
(9,'Maestro del Horizonte',2,8990,14,'figura3','#d7a981','Maestro viajero que comparte sus conocimientos con quienes emprenden su propio camino.','maestro-del-horizonte.webp'),
(10,'Sombra Errante',3,7990,0,'figura1','#a69cae','Una misteriosa figura que aparece en las leyendas de los pasos montañosos. Pieza agotada de la colección.','sombra-errante.webp')
ON DUPLICATE KEY UPDATE
    nome = VALUES(nome),
    categoria_id = VALUES(categoria_id),
    desenho = VALUES(desenho),
    cor = VALUES(cor),
    descricao = VALUES(descricao),
    imagem = VALUES(imagem);
