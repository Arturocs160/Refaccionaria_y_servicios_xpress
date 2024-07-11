-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2024 a las 05:16:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `motoservicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_Categoria` varchar(20) NOT NULL,
  `desc_Categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_Categoria`, `desc_Categoria`) VALUES
(1, 'Accesorios', 'Accesorios para personalizar y mejorar tu moto'),
(2, 'Refacciones', 'Refacciones originales y de calidad para tu moto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `num_Cita` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `id_Cliente` int(11) NOT NULL,
  `id_Servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_Cliente` int(11) NOT NULL,
  `nombre_Cliente` varchar(40) NOT NULL,
  `apellido1` varchar(30) NOT NULL,
  `apellido2` varchar(30) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_Producto` int(11) NOT NULL,
  `nombre_Produc` varchar(40) NOT NULL,
  `desc_Produc` varchar(100) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `id_Categoria` int(11) NOT NULL,
  `url_Img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_Producto`, `nombre_Produc`, `desc_Produc`, `precio`, `id_Categoria`, `url_Img`) VALUES
(1, 'Playera Manga Larga', 'Playera manga larga marca roda logo rojo', 500, 1, NULL),
(2, 'Retenes motor', 'Retenes motor set Honda GL 150 cargo 14-19', 500, 2, NULL),
(3, 'Bujia C7HSA', 'Bujia C7HSA NGK', 500, 2, NULL),
(4, 'Bujia roda C9E', 'Bujia RODA C9E', 500, 2, NULL),
(5, 'Llanta 130/90', 'Llanta 130/90 15 6PR TT Calle Motocore', 500, 2, NULL),
(6, 'Llanta 120/80', 'Llanta 120/80 18 6PR TT DP Motocore', 500, 2, NULL),
(7, 'Filtro Aceite SUZUKI', 'Filtro aceit;e SUZUKI EN 125 KN 131', 500, 2, NULL),
(8, 'Foco faro HONDA', 'Foco faro delantero HONDA CGL 125 TOOL 12V 35W', 500, 2, NULL),
(9, 'Relevador VENTO', 'Relevador motor arranque VENTO ROCKETMAN 250 (20-21)/ SUZUKI EN 125 HU (13-16)', 500, 2, NULL),
(10, 'Porta foco ITALIKA', 'Porta foco faro delantero ITALIKA  FT 150(13-16) 12V', 500, 2, NULL),
(11, 'Tensero cadena ITALIKA', 'Tensor cadena tiempo ITALIKA DS 125(17-18) DS 150(06-18)', 500, 2, NULL),
(12, 'Cadena tiempo ITALIKA', 'Cadena tiempo ITALIKA DS 125(17-18) DS 150(06-18)', 500, 2, NULL),
(13, 'Cadena 428hx1261', 'Cadena 428xh1261 RODA', 500, 2, NULL),
(14, 'Anillas 0 00 estandar', 'Aanillos 0 00 estandar SET ITALIKA DS 150(06-18) WSTD', 500, 2, NULL),
(15, 'Pedal HONDA GL', 'Pedal cambios HONDA GL 150 cargo(14-19)', 500, 2, NULL),
(16, 'Empaques motor ITALIKA', 'Empaques motor completo SET ITALIKA AT 110 SPORT (11-15)', 500, 2, NULL),
(17, 'Empaques motor HONDA', 'Empaques motor HONDA SET HONDA GL 150 cargo(14-19)/ XR 150L', 500, 2, NULL),
(18, 'Llantas 350 MOTOCORE', 'Llanta 350 18 6PR TT DP MOTOCORE', 500, 2, NULL),
(19, 'Llantas LT DP MOTOCORE', 'Llanta 350 18 6PR TL DP MOTOCORE', 500, 2, NULL),
(20, 'Llanta 90/90 MOTOCORE', 'Llanta 90/90 18 6PR TL DP MOTOCORE', 500, 2, NULL),
(21, 'Llanta 3.00 18 6PR', 'Llanta 3.00 18 6PR TT DP MOTOCORE', 500, 2, NULL),
(22, 'Llanta 3.50 18 6PR', 'Llanta 3.50 10 6PR TT DP GHIRA', 500, 2, NULL),
(23, 'Llanta 130/60 GHIRA', 'Llanta 130/60 13 6PR TL calle Ghira', 500, 2, NULL),
(24, 'Llanta 100/60 GHIRA', 'Llanta 100/90 10 6PR TT calle Ghira', 500, 2, NULL),
(25, 'Filtro aceite BAJAJ', 'Filtro aceite Bajaj pulsar 200 KN-155', 500, 2, NULL),
(26, 'Direccionales HONDA', 'Direccionales SET HONDA GL 150', 500, 2, NULL),
(27, 'Arnes electrico SUZUKI', 'Arnes electrico SUZUKI EN 125HU(07-19)', 500, 2, NULL),
(28, 'Relevador VENTO', 'Relevador de motor arranque VENTO ROCKETMAN 250(20-21)', 500, 2, NULL),
(29, 'Direccionales SET ITALIKA', 'Direccionales SET ITALIKA DM 200(07-19)', 500, 2, NULL),
(30, 'Conmutador izquierdo ITALIKA', 'Conmutador izquierda ITALIKA FT 180 TS(18-22) 12V', 500, 2, NULL),
(31, 'Interruptor luces', 'Interruptor (boton) luces ALTA/BAJA Universal', 500, 2, NULL),
(32, 'Chamarra', 'CHAMARRA CON PROTECCIONES NEGRO', 500, 1, NULL),
(33, 'Guantes negros', 'GUANTES COMPLETOS C/PIEL Y PROTECCION CE NEGRO', 500, 1, NULL),
(34, 'Guantes rojos', 'GUANTES C/PROTECCION COMPLETA ROJO', 500, 1, NULL),
(35, 'Guantes azules', 'GUANTES C/PROTECCION COMPLETA AZUL', 500, 1, NULL),
(36, 'Impermeables', 'IMPERMEABLE AZUL', 500, 1, NULL),
(37, 'Protecciones', 'PROTECCION PLASTICA ROD/CODOS NEGRO', 500, 1, NULL),
(38, 'Protecciones', 'KIT PROTECCION PL?STICA RODILLERAS NEGRO', 500, 1, NULL),
(39, 'Espejo azul', 'ESPEJO ITK NEGRO-AZUL', 500, 1, NULL),
(40, 'Espejo cromado', 'ESPEJO ITK NEGRO-CROMADO', 500, 1, NULL),
(41, 'Espejo dorado', 'ESPEJO ITK NEGRO-DORADO', 500, 1, NULL),
(42, 'Espejo rojo', 'ESPEJO ITK NEGRO-ROJO', 500, 1, NULL),
(43, 'Espejo circular plateado', 'ESPEJOS ITK CIRCULARES PLATEADO-NARANJA', 500, 1, NULL),
(44, 'Espejo circular rojo', 'ESPEJOS ITK CIRCULARES NEGRO-ROJO', 500, 1, NULL),
(45, 'Espejo road', 'ESPEJO CITY ROAD ROJO', 500, 1, NULL),
(46, 'Espejo road plata', 'ESPEJO CITY ROAD PLATA', 500, 1, NULL),
(47, 'Red', 'RED ELASTICA AMARILLO', 500, 1, NULL),
(48, 'Red', 'RED ELASTICA AZUL', 500, 1, NULL),
(49, 'Red', 'RED ELASTICA NEGRO', 500, 1, NULL),
(50, 'Pu?os verde', 'PU?OS ITK NEGRO-VERDE', 500, 1, NULL),
(51, 'Pu?os cromado', 'PU?OS ITK NEGRO-CROMADO', 500, 1, NULL),
(52, 'Pu?os azul', 'PU?OS ITK NEGRO-AZUL', 500, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_Servicio` int(11) NOT NULL,
  `nombre_Servicio` varchar(40) NOT NULL,
  `desc_Servicio` varchar(50) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `url_Img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_Servicio`, `nombre_Servicio`, `desc_Servicio`, `precio`, `url_Img`) VALUES
(1, 'Cambio de Aceite', 'Sustituci?n del aceite del motor para asegurar una', 500, NULL),
(2, 'Revisi?n y Cambio de Filtros', 'Inspecci?n y reemplazo del filtro de aire y filtro', 500, NULL),
(3, 'Revisi?n de Bater?a', 'Verificaci?n del estado de carga y limpieza de los', 500, NULL),
(4, 'Inspecci?n y Ajuste de Frenos', 'Revisi?n del desgaste de las pastillas y discos de', 500, NULL),
(5, 'Revisi?n de Neum?ticos', 'Inspecci?n de la presi?n y el desgaste de los neum', 500, NULL),
(6, 'Lubricaci?n de Cables y Cadenas', 'Aplicaci?n de lubricante a los cables de control y', 500, NULL),
(7, 'Inspecci?n del Sistema de Escape', 'Verificaci?n de posibles fugas y estado general de', 500, NULL),
(8, 'Reemplazo de Pastillas y Discos de Freno', 'Sustituci?n de las pastillas y/o discos de freno', 500, NULL),
(9, 'Reparaci?n del Sistema de Suspensi?n', 'Reparaci?n o reemplazo de amortiguadores y otros c', 500, NULL),
(10, 'Cambio de Buj?as', 'Sustituci?n de las buj?as para asegurar una correc', 500, NULL),
(11, 'Reemplazo de la Correa de Transmisi?n', 'Cambio de la correa de transmisi?n si est? desgast', 500, NULL),
(12, 'Reparaci?n del Sistema El?ctrico', 'Diagn?stico y reparaci?n de problemas el?ctricos', 500, NULL),
(13, 'Alineaci?n y Balanceo de Ruedas', 'Ajuste del alineado de las ruedas y balanceo', 500, NULL),
(14, 'Reparaci?n de Fugas de L?quidos', 'Localizaci?n y reparaci?n de fugas de aceite, refr', 500, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_Usuario` varchar(30) NOT NULL,
  `apellido_Usuario` varchar(30) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `contrasenia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`num_Cita`),
  ADD KEY `id_Cliente` (`id_Cliente`),
  ADD KEY `id_Servicio` (`id_Servicio`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_Cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_Producto`),
  ADD KEY `id_Categoria` (`id_Categoria`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_Servicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `num_Cita` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_Cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_Servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_Cliente`) REFERENCES `clientes` (`id_Cliente`),
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_Servicio`) REFERENCES `servicios` (`id_Servicio`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_Categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
