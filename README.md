# 🍽️ API de Gestión de Órdenes - Node.js

## 🧾 Descripción

Construí una API RESTful para la gestión de órdenes de un restaurante, implementada en Node.js, siguiendo principios SOLID, utilizando Sequelize, PostgreSQL como base de datos y Redis para caché. Toda la solución está contenedorizada con Docker para facilitar su ejecución.

## ⚙️ Cómo levantar el proyecto con Docker

1. Clonar el repositorio:
   <pre>
    git clone repository-url
   </pre>
   <pre>
    cd repository-folder
   </pre>
2. Crear el archivo .env (hay un .env.example disponible).
3. Iniciar los contenedores.
Ejecuta el siguiente comando para construir e iniciar los servicios de backend, Postgres y Redis:
  <pre>
    docker-compose up --build
   </pre>

## ✅ Tests

Se incluyó un test unitario para el endpoint findById del servicio de órdenes (OrdersService).

## 📬 Documentación en Postman

Podés probar los endpoints con la colección en Postman:
https://fabrizio-5953688.postman.co/workspace/Fabrizio's-Workspace~9595489f-e72a-4b69-8f02-3b1249f375d6/collection/44995071-15c86ef0-f14c-42cf-9748-7a92f79d0bbb?action=share&creator=44995071

## 🧱 Estructura de la base de datos

Tablas y campos

Order
• client_name
• total
• status

OrderItem
• description
• quantity
• unit_price

Relaciones
• Un Order puede tener muchos OrderItems (uno a muchos).
• Un OrderItem pertenece a un único Order (muchos a uno).
