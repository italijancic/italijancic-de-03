# 🚀 3do desafio entregable
Author: Ivan Talijancic

# 📦 Contenido del repositorio
En este repositorio se entrega el código correspondiente a la resolución del 2do desafion entregable del curso de BackEnd de coderhouse.

## 📋 Consignas
- Desarrollar un **servidor** basasdo en `express` en donde podamos hacer consultas a nuestro archivo de productos.

### ✅ Aspectos a incluir
- Se deberá utilizar la clase `ProductManager` que actualmente utlizamos con persistencia de archivos.
- Desarrollar un `servidor express` que, en su archivo **app.js** importe al archivo de `ProductManager` que actualmente tenemos.
- El servidor debe contat con los siguientes endopoints:
    - `'/products'`: debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor `?limit=` el cual recibirá un límite de resultados.
        - Se ino se revibe query de límite, **se devolverán todos los rpoductos**.
        - Si se recibe un límite, devolver solo el número de prodcutos solicitados.
    - `'/products/:pid'`: debe recibir por `req.params` el `pid` (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.
