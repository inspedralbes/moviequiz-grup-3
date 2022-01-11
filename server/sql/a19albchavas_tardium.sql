-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-12-2021 a las 08:34:05
-- Versión del servidor: 10.6.4-MariaDB-1:10.6.4+maria~focal
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `a19albchavas_tardium`
--
CREATE DATABASE IF NOT EXISTS `a19albchavas_tardium` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci;
USE `a19albchavas_tardium`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id_user` varchar(23) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` text NOT NULL,
  `score` int(9) NOT NULL DEFAULT 0,
  `img_path` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id_user`, `username`, `email`, `password`, `score`, `img_path`) VALUES
('61c25d5dd19799.23112141', 'Arnau', 'arnau@gmail.com', '$2y$10$muEdtieZQjSQfb43f.OI3uDFan62zvT4ZUz896OlEMfpbGolUOZ3W', 0, NULL),
('61c2624ca56269.43672156', 'Eric', 'a19ericlecas@inspedralbes.cat', '$2y$10$7VVVuj3M7XgDskW9K9Sf7OmsjODbD.LjLWSZ.jGRYUiQoC6JQ7OSK', 0, NULL),
('61c264e8935a87.11513867', 'Pedra', 'pedra@inspedralbes.cat', '$2y$10$Y1um/9mCsqbV9dybMGlW1ulGtQbnO6uZ5GDJFjQ6Fv4LxrajItOlm', 2, NULL),
('61c2658f713bb4.78796358', 'Ausias', 'ausias@inspedralbes.cat', '$2y$10$rh6GjoTrMSk7fUeJsOiYI.RYL9xAo5IqI.rSxx9kt0j8.AFFl9IYe', 0, NULL),
('61c268006e12d7.99268728', 'Albert', 'albert@gmail.com', '$2y$10$qEAeysvA8RIPuQBMd3S5hOBT0UjubCLU5Kec2Q9wcZJexbWCEl5ei', 13, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id_feedback` int(11) NOT NULL,
  `id_movie` varchar(9) NOT NULL,
  `id_user` varchar(23) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `feedbacks`
--

INSERT INTO `feedbacks` (`id_feedback`, `id_movie`, `id_user`, `rating`, `comment`) VALUES
(100, 'tt0317219', '61c25d5dd19799.23112141', NULL, NULL),
(101, 'tt1216475', '61c25d5dd19799.23112141', NULL, NULL),
(102, 'tt3606752', '61c25d5dd19799.23112141', NULL, NULL),
(103, 'tt0848228', '61c25d5dd19799.23112141', NULL, NULL),
(104, 'tt4154796', '61c25d5dd19799.23112141', NULL, NULL),
(105, 'tt4154756', '61c25d5dd19799.23112141', NULL, NULL),
(106, 'tt0317219', '61c264e8935a87.11513867', '5.0', 'Preciosa!'),
(107, 'tt1216475', '61c264e8935a87.11513867', '3.0', 'No tant bona com la primera...'),
(110, 'tt0426955', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `id_game` varchar(23) NOT NULL,
  `id_user` varchar(23) NOT NULL,
  `name` varchar(20) NOT NULL,
  `games_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`games_json`)),
  `results_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`results_json`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id_game`, `id_user`, `name`, `games_json`, `results_json`) VALUES
('61c2667f840583.92016475', '61c264e8935a87.11513867', 'Partida1', '[{\"id_movie\":\"tt0848228\",\"title\":\"The Avengers\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg\",\"years\":[2017,2007,2012,2014,2010]},{\"id_movie\":\"tt2005374\",\"title\":\"The Frozen Ground\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BYzM3Mjc1ZDItMTE1OC00ODk0LWFmZjctYzgxZmYwNzliMTdkXkEyXkFqcGdeQXVyMTAxNDE3MTE5._V1_SX300.jpg\",\"years\":[2013,2003,2011,2018,1998]},{\"id_movie\":\"tt0301634\",\"title\":\"Frozen Stiff\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTk5NDc0MjU3Nl5BMl5BanBnXkFtZTcwNDc3NTU3OQ@@._V1_SX300.jpg\",\"years\":[1997,1992,1987,2012,2002]},{\"id_movie\":\"tt4520988\",\"title\":\"Frozen II\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg\",\"years\":[2019,2004,2021,2024,2034]},{\"id_movie\":\"tt1216475\",\"title\":\"Cars 2\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_SX300.jpg\",\"years\":[1996,2001,2013,2011,2009]}]', '{\"pressed\":[\"2010\",\"2011\",\"1997\",\"2019\",\"2011\"],\"name\":\"Partida1\",\"score\":0}'),
('61c268b9ae6e34.93735931', '61c268006e12d7.99268728', 'Je', '[{\"id_movie\":\"tt2084949\",\"title\":\"Superman, Spiderman or Batman\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg\",\"years\":[2009,2011,2006,2016,2026]},{\"id_movie\":\"tt0200027\",\"title\":\"Riding in Cars with Boys\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BOGM5MzU5NTgtMmJjZC00Y2E2LThhZGQtMGE5YzUxZTgwZDdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg\",\"years\":[2016,2001,1996,1986,2003]},{\"id_movie\":\"tt0301634\",\"title\":\"Frozen Stiff\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTk5NDc0MjU3Nl5BMl5BanBnXkFtZTcwNDc3NTU3OQ@@._V1_SX300.jpg\",\"years\":[2007,2000,2017,2002,2012]},{\"id_movie\":\"tt0848228\",\"title\":\"The Avengers\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg\",\"years\":[2010,2012,2007,2002,2022]},{\"id_movie\":\"tt0288441\",\"title\":\"Barbie in the Nutcracker\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTk0Y2E2MjgtZDBhNi00OTQ3LTkyYzAtNTdmNzRhYTczZWI2XkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg\",\"years\":[2016,2006,1991,2001,1986]}]', '{\"pressed\":[\"2011\",\"2001\",\"2000\",\"2002\",\"1991\"],\"name\":\"Je\",\"score\":0}'),
('61c2c7ba39df97.70901170', '', '', '[{\"id_movie\":\"tt2084949\",\"title\":\"Superman, Spiderman or Batman\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg\",\"years\":[2016,2011,2009,1996,2006]},{\"id_movie\":\"tt0071282\",\"title\":\"The Cars That Ate Paris\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BNTVmOTdmYTktY2JmNi00YzJmLWJjNGItMjNmOWM1MDM0MjZiL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg\",\"years\":[1984,1979,1974,1959,1989]},{\"id_movie\":\"tt1160419\",\"title\":\"Dune\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg\",\"years\":[2021,2031,2036,2019,2006]},{\"id_movie\":\"tt4007502\",\"title\":\"Frozen Fever\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMjY3YTk5MjUtODBjOC00NzAwLTgyYjYtMzFmMzAxOTZmOWRlXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg\",\"years\":[2010,2005,2020,2015,2000]},{\"id_movie\":\"tt2294629\",\"title\":\"Frozen\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg\",\"years\":[1998,2015,2008,2003,2013]}]', '{\"pressed\":[\"2011\",\"1984\",\"2031\",\"2020\",\"2015\"],\"name\":\"\",\"score\":0}'),
('61c2d3e2df7c75.75579911', '61c268006e12d7.99268728', 'Mola', '[{\"id_movie\":\"tt1323045\",\"title\":\"Frozen\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTc5MTg0ODgxMF5BMl5BanBnXkFtZTcwODEzOTYwMw@@._V1_SX300.jpg\",\"years\":[2020,1995,2008,2000,2010]},{\"id_movie\":\"tt0978759\",\"title\":\"Frozen River\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMTk2NjMwMDgzNF5BMl5BanBnXkFtZTcwMDY0NDY3MQ@@._V1_SX300.jpg\",\"years\":[2023,2013,1993,2008,2018]},{\"id_movie\":\"tt0426955\",\"title\":\"Barbie as The Princess and the Pauper\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BMGY5MzU3MzItNDBjMC00YjQzLWEzMTUtMGMxMTEzYjhkMGNkXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg\",\"years\":[2002,1989,2014,2006,2004]},{\"id_movie\":\"tt0071282\",\"title\":\"The Cars That Ate Paris\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BNTVmOTdmYTktY2JmNi00YzJmLWJjNGItMjNmOWM1MDM0MjZiL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg\",\"years\":[1969,1959,1974,1984,1964]},{\"id_movie\":\"tt0200027\",\"title\":\"Riding in Cars with Boys\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BOGM5MzU5NTgtMmJjZC00Y2E2LThhZGQtMGE5YzUxZTgwZDdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg\",\"years\":[1991,2003,1996,2001,2011]}]', '{\"pressed\":[\"2010\",\"2013\",\"2006\",\"1974\",\"2001\"],\"name\":\"Mola\",\"score\":0}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id_movie` varchar(9) NOT NULL,
  `title` text NOT NULL,
  `year` int(4) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `img_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id_movie`, `title`, `year`, `rating`, `img_path`) VALUES
('tt0071282', 'The Cars That Ate Paris', 1974, '0.0', 'https://m.media-amazon.com/images/M/MV5BNTVmOTdmYTktY2JmNi00YzJmLWJjNGItMjNmOWM1MDM0MjZiL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg'),
('tt0081698', 'Used Cars', 1980, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTAzOTBhNTAtMzY5MS00YjcwLWIzYWItNWI1NzQ4YjcxY2E2XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg'),
('tt0083658', 'Blade Runner', 1982, '0.0', 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'),
('tt0200027', 'Riding in Cars with Boys', 2001, '0.0', 'https://m.media-amazon.com/images/M/MV5BOGM5MzU5NTgtMmJjZC00Y2E2LThhZGQtMGE5YzUxZTgwZDdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
('tt0288441', 'Barbie in the Nutcracker', 2001, '3.0', 'https://m.media-amazon.com/images/M/MV5BMTk0Y2E2MjgtZDBhNi00OTQ3LTkyYzAtNTdmNzRhYTczZWI2XkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg'),
('tt0301634', 'Frozen Stiff', 2002, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTk5NDc0MjU3Nl5BMl5BanBnXkFtZTcwNDc3NTU3OQ@@._V1_SX300.jpg'),
('tt0317219', 'Cars', 2006, '5.0', 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg'),
('tt0372784', 'Batman Begins', 2005, '0.0', 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
('tt0390579', 'Two Cars, One Night', 2003, '0.0', 'https://m.media-amazon.com/images/M/MV5BOWJjZTZkOGMtYTM0ZS00MmVlLTljODctN2NhYTczZjEyODYyXkEyXkFqcGdeQXVyNTc0MDk2MTg@._V1_SX300.jpg'),
('tt0426955', 'Barbie as The Princess and the Pauper', 2004, '0.0', 'https://m.media-amazon.com/images/M/MV5BMGY5MzU3MzItNDBjMC00YjQzLWEzMTUtMGMxMTEzYjhkMGNkXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg'),
('tt0848228', 'The Avengers', 2012, '0.0', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'),
('tt0978759', 'Frozen River', 2008, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTk2NjMwMDgzNF5BMl5BanBnXkFtZTcwMDY0NDY3MQ@@._V1_SX300.jpg'),
('tt1160419', 'Dune', 2021, '0.0', 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg'),
('tt1216475', 'Cars 2', 2011, '3.0', 'https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_SX300.jpg'),
('tt1282139', 'Cars of the Revolution', 2008, '0.0', 'https://m.media-amazon.com/images/M/MV5BZmE3NGIzZmEtZTBhNi00ZDYzLWJmZjItZWRmMmYzYzVmNTViXkEyXkFqcGdeQXVyMjExNjgyMTc@._V1_SX300.jpg'),
('tt1323045', 'Frozen', 2010, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTc5MTg0ODgxMF5BMl5BanBnXkFtZTcwODEzOTYwMw@@._V1_SX300.jpg'),
('tt1856101', 'Blade Runner 2049', 2017, '0.0', 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg'),
('tt2005374', 'The Frozen Ground', 2013, '0.0', 'https://m.media-amazon.com/images/M/MV5BYzM3Mjc1ZDItMTE1OC00ODk0LWFmZjctYzgxZmYwNzliMTdkXkEyXkFqcGdeQXVyMTAxNDE3MTE5._V1_SX300.jpg'),
('tt2084949', 'Superman, Spiderman or Batman', 2011, '0.0', 'https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg'),
('tt2294629', 'Frozen', 2013, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'),
('tt2705436', 'Italian Spiderman', 2007, '0.0', 'https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg'),
('tt2975590', 'Batman v Superman: Dawn of Justice', 2016, '0.0', 'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
('tt3606752', 'Cars 3', 2017, '1.0', 'https://m.media-amazon.com/images/M/MV5BMTc0NzU2OTYyN15BMl5BanBnXkFtZTgwMTkwOTg2MTI@._V1_SX300.jpg'),
('tt4007502', 'Frozen Fever', 2015, '0.0', 'https://m.media-amazon.com/images/M/MV5BMjY3YTk5MjUtODBjOC00NzAwLTgyYjYtMzFmMzAxOTZmOWRlXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_SX300.jpg'),
('tt4154756', 'Avengers: Infinity War', 2018, '0.0', 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg'),
('tt4154796', 'Avengers: Endgame', 2019, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'),
('tt4520988', 'Frozen II', 2019, '0.0', 'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'),
('tt5978586', 'Spiderman in Cannes', 2016, '0.0', 'https://m.media-amazon.com/images/M/MV5BZDlmMGQwYmItNTNmOS00OTNkLTkxNTYtNDM3ZWVlMWUyZDIzXkEyXkFqcGdeQXVyMTA5Mzk5Mw@@._V1_SX300.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- Indices de la tabla `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id_feedback`),
  ADD KEY `id_movie` (`id_movie`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id_game`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_user_2` (`id_user`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id_movie`),
  ADD KEY `id_movie` (`id_movie`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id_feedback` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
