# API de Forja Celeste para XAMPP

API REST de demostración para una tienda de figuras originales. Utiliza PHP 8.1
o posterior con PDO MySQL y una base de datos MariaDB o MySQL.

## Instalación local

1. Conserva la carpeta `backend` dentro de `C:\xampp\htdocs\Lojavirtual`.
2. Inicia Apache y MySQL desde el panel de XAMPP.
3. Abre `http://localhost/phpmyadmin` e importa `banco/estrutura.sql` y luego
   `banco/produtos.sql`.
4. Comprueba el catálogo en
   `http://localhost/Lojavirtual/backend/api/produtos.php`.
5. Inicia la interfaz React en la carpeta `orbita-react`; consulta su README.

La base de datos se llama `orbita_simples`. Si tu instalación local usa otras
credenciales, edita `config/configuracao.php`. El archivo de catálogo puede
volverse a importar para actualizar las categorías y productos de muestra con
identificadores del 1 al 10. No elimina otros registros.

## Endpoints

| Método | Ruta |
| --- | --- |
| GET | `api/categorias.php` |
| GET | `api/categorias.php?id=1` |
| GET | `api/produtos.php` |
| GET | `api/produtos.php?id=1` |
| GET | `api/produtos.php?categoria_id=1` |
| POST | `api/pedidos.php` |
| GET | `api/pedidos.php?codigo=CODIGO` |
| POST | `api/pagamentos.php?codigo=CODIGO` |

Para crear un pedido, envía JSON a `POST api/pedidos.php`:

```json
{
  "nome": "Persona de ejemplo",
  "email": "persona@example.com",
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 1
    }
  ]
}
```

El servidor calcula el precio y comprueba las existencias. El pago es una
simulación: no introduzcas datos bancarios ni información personal real.

Si la base de datos ya existía antes de añadir imágenes, importa
`banco/migracao_imagens.sql` una vez. La columna `imagem` contiene el nombre del
archivo de cada figura y el frontend lo busca en `orbita-react/public/images`.
