# GESTION BACKEND DE E-COMMERCE

Proyecto creado para el curso de backend de CoderHouse. Primer pre entrega:

## Pruebas realizadas con PostMan

**Metodos Utilizados**
 - GET
 - POST
 - PUT
 - DELETE

## Endpoints Disponibles

### Productos (`/api/products`)

| Método  | Endpoint             | Descripción |
|---------|----------------------|-------------|
| **GET**  | `/api/products`       | Obtiene todos los productos (con opción de limitar resultados `?limit=10`) |
| **GET**  | `/api/products/:pid`  | Obtiene un producto por su `id` |
| **POST** | `/api/products`       | Agrega un nuevo producto (se autogenera el `id`) |
| **PUT**  | `/api/products/:pid`  | Actualiza un producto (sin modificar el `id`) |
| **DELETE** | `/api/products/:pid` | Elimina un producto por su `id` |

---

### Carritos (`/api/carts`)

| Método  | Endpoint                            | Descripción |
|---------|-------------------------------------|-------------|
| **POST** | `/api/carts`                       | Crea un nuevo carrito con un `id` único |
| **GET**  | `/api/carts/:cid`                  | Obtiene todos los productos de un carrito específico |
| **POST** | `/api/carts/:cid/product/:pid`     | Agrega un producto a un carrito (incrementa la cantidad si ya existe) |

## Tecnologías utilizadas

 - Node.js
 - Express.js
 - File System
 - Postman

**Dependecias instaladas**
 - Nodemon 