# GESTION BACKEND DE E-COMMERCE

Proyecto creado para el curso de backend de CoderHouse. Segunda pre entrega:

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
 - Express Handlebars
 - Socket.io

 
## WebSockets (Socket.io)

Este proyecto utiliza **WebSockets** con `Socket.io` para actualizar la lista de productos en tiempo real sin necesidad de recargar la página.

- Cuando un usuario agrega o elimina un producto mediante HTTP (`POST/DELETE`), se emite un evento WebSocket para actualizar la lista en todos los clientes conectados.
- En el frontend, se escucha el evento `updateProducts` para mostrar los productos actualizados automáticamente.


## Handlebars 

El proyecto utiliza **Handlebars** como motor de plantillas para renderizar vistas dinámicas en el servidor.

 - Genera HTML dinámico
 - Separa la lógica del backend de la del frontend.
 - Facilita la reutilización de componentes 