-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-04-2022 a las 02:37:38
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT current_timestamp(),
  `id_estado` int(1) NOT NULL,
  `id_pago` int(1) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `fecha_pedido`, `id_estado`, `id_pago`, `id_usuario`) VALUES
(11, '2020-11-15 23:23:08', 2, 1, 2),
(12, '2020-11-17 05:11:52', 1, 2, 2),
(14, '2020-11-17 05:14:42', 3, 1, 1),
(15, '2020-11-19 01:59:36', 1, 1, 9),
(16, '2020-11-19 01:59:46', 1, 1, 9),
(17, '2022-04-07 21:12:21', 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalles`
--

CREATE TABLE `pedido_detalles` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_detalles`
--

INSERT INTO `pedido_detalles` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad_producto`) VALUES
(1, 11, 1, 4),
(2, 11, 8, 3),
(3, 12, 9, 2),
(4, 13, 4, 2),
(5, 13, 1, 1),
(6, 14, 4, 2),
(7, 14, 1, 1),
(8, 15, 10, 1),
(9, 16, 9, 1),
(10, 16, 1, 2),
(11, 17, 9, 1),
(12, 17, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_estados`
--

CREATE TABLE `pedido_estados` (
  `id_estado` int(1) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_estados`
--

INSERT INTO `pedido_estados` (`id_estado`, `estado`) VALUES
(1, 'Nuevo'),
(2, 'Confirmado'),
(3, 'Preparando'),
(4, 'Enviando'),
(5, 'Entregado'),
(6, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_tiposdepagos`
--

CREATE TABLE `pedido_tiposdepagos` (
  `id_pago` int(1) NOT NULL,
  `tipo_pago` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_tiposdepagos`
--

INSERT INTO `pedido_tiposdepagos` (`id_pago`, `tipo_pago`) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta de Crédito / Débito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(400) NOT NULL,
  `precio` int(10) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES
(1, 'Pizza especial a elección.', '1/2 pizza muzzarella y 1/2 pizza especial a elección.', 400, 'pizza_special.jpg'),
(2, 'Hamburguesa de carne completa', 'Hamburguesa de carne con queso, jamon, tomate y lechuga. Viene con papas', 300, 'hamburguesa.jpg'),
(4, '12 Empanadas', '12 empanadas con relleno a elección', 250, 'empanadas_eleccion.jpg'),
(8, 'Sandwich de Autor', 'Sandwich a elección', 300, 'sandiwch_autor.jpg'),
(9, 'Napolitana', 'Milanesa a la napolitana. Incluye Papas', 380, 'Napolitana_milanesa.jpg'),
(10, 'Tostado de Lomito y Queso', 'Tostado de lomito y queso pategras en pan bar', 370, 'tostado_LYQ.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `nombre_apellido` varchar(300) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` int(100) NOT NULL,
  `direccion_envio` varchar(300) NOT NULL,
  `pw` varchar(100) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `nombre_apellido`, `email`, `telefono`, `direccion_envio`, `pw`, `admin`) VALUES
(1, 'agudelgiudice', 'Agustin Del Giudice', 'agudel@gmail.com', 1144444444, 'anonimo 2334', '123456', 1),
(2, 'nicodruetta', 'Nicolas Druetta', 'nico@email.com', 1188888888, 'calle anonima, la quiaca, 334', '123456', 0),
(9, 'nachoalvarez', 'Ignacio Alvarez', 'alvarez@gmail.com', 1144443333, 'calle anonima, 3456', 'nch5674', 0),
(10, 'jonibaro', 'Jonatan Torre', 'jonatorre@gmail.com', 1144443333, 'calle anonima, 34534', 'jb367', 0),
(12, 'michsav', 'Michel Savoie', 'michsavo@gmail.com', 1144443333, 'Calle Anonima, 23455', 'mich246', 0),
(14, 'flaviadel', 'flavia del giudice', 'fladelgiu@email.com', 57435777, 'anonimo 2334233', '123456', 0),
(16, 'josebarzo', 'jose barzola', 'jose@email.com', 452345123, 'anonimo 4532456', 'jose333444', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `pedido_detalles`
--
ALTER TABLE `pedido_detalles`
  ADD PRIMARY KEY (`id_detalle`);

--
-- Indices de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `pedido_tiposdepagos`
--
ALTER TABLE `pedido_tiposdepagos`
  ADD PRIMARY KEY (`id_pago`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `pedido_detalles`
--
ALTER TABLE `pedido_detalles`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  MODIFY `id_estado` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedido_tiposdepagos`
--
ALTER TABLE `pedido_tiposdepagos`
  MODIFY `id_pago` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
