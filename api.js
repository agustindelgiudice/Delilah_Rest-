const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const rateLimit = require('express-rate-limit');
const productos = require('./funciones/productos');
const usuarios = require('./funciones/usuarios');
const pedidos = require('./funciones/pedidos');
const { usersOk, adminOk } = require('./funciones/middlewares');


//----------------------------------------------------------------------------------//

var dotenv = require('dotenv');
dotenv.config(); 

//----------------------------------------------------------------------------------//




//*Limitador de peticiónes // evita ataques de fuerza bruta
// const limiter = rateLimit ({
//   windowsMS: 60 * 60 * 1000,
//   max: 2,
//   message: "Has alcanzado el limite máximo de solicitudes"
// });


//----------------------------------------------------------------------------------//

// app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors());

//----------------------------------------------------------------------------------//


//*-->ENDPOINTS-PRODUCTOS<--// 
app.get('/productos', usersOk, productos.verProductos);
app.get('/productos/:productoId', usersOk, productos.verProductoId);
app.post('/productos', usersOk, adminOk, productos.agregarProducto);
app.put('/productos/:productoId', usersOk, adminOk, productos.modificarProducto);
app.delete('/productos/:productoId', usersOk, adminOk, productos.eliminarProducto);

//*-->ENDPOINTS-USUARIOS<--//
app.get('/usuarios', usersOk, adminOk, usuarios.verUsuarios);
app.get('/usuario/signup', usuarios.nuevoUsuario);
app.post('/usuario/login', usuarios.logInUsuario);

//*-->ENDPOINTS PEDIDOS<--//
app.get('/pedidos', usersOk, adminOk, pedidos.verPedidos);
app.get('/pedidos/:pedidoId', usersOk, pedidos.verPedidoId);
app.post('/pedidos', usersOk, pedidos.crearPedido);
app.put('/pedidos/:pedidoId', usersOk, adminOk, pedidos.modificarPedido);

//----------------------------------------------------------------------------------//


//* PARA INICIAR EL SERVIDOR
app.listen(process.env.PORT, () => {
  console.log("Server on port:" + process.env.PORT);
});




/*
COMENTARIO NORMAL
!,
*,
?,
TODO:,
*/

