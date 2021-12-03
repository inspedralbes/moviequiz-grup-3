-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2021 a las 13:28:36
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tardium`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id_user` int(9) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `score` int(9) NOT NULL DEFAULT 0,
  `imgPath` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id_user`, `username`, `email`, `password`, `score`, `imgPath`) VALUES
(7, 'albert', 'albert@gmail.com', '$2y$10$O.NXgxVlTLH5M6BfoG.pr.EQi', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id_movie` int(9) NOT NULL,
  `id_user` int(9) NOT NULL,
  `rating` float DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id_movie` varchar(9) NOT NULL,
  `title` varchar(20) NOT NULL,
  `year` int(4) NOT NULL,
  `rating` float NOT NULL,
  `imgPath` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id_movie`, `title`, `year`, `rating`, `imgPath`) VALUES
('tt0317219', 'Cars', 2006, 0, 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD UNIQUE KEY `id` (`id_user`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id_movie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id_user` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
