SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `a19albchavas_tardium` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `a19albchavas_tardium`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id_user` varchar(23) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` text NOT NULL,
  `score` int(9) NOT NULL DEFAULT 0,
  `img_path` text DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `accounts` (`id_user`, `username`, `email`, `password`, `score`, `img_path`) VALUES
('61bf4dcc3270c4.50013581', 'pedralbes', 'pedralbes@gmail.com', '$2y$10$F/aM9/duFw1QsHdbNPQ9N.DrNVpL8o3VOtv9H.W4MxN0SOu1i1F6G', 0, NULL),
('61bf4df4017849.41405788', 'ausias', 'ausias@gmail.com', '$2y$10$tq6x.jhT/aWxDxTFa2Q1b.9Nt6rtZ8Wi7o/Yh2.hBywyS8HEDhBSe', 0, NULL);

CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id_feedback` int(11) NOT NULL AUTO_INCREMENT,
  `id_movie` varchar(9) NOT NULL,
  `id_user` varchar(23) NOT NULL,
  `rating` decimal(1,1) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  PRIMARY KEY (`id_feedback`),
  KEY `id_movie` (`id_movie`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `games` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(23) NOT NULL,
  `games_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`games_json`)),
  `results_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`results_json`)),
  PRIMARY KEY (`id_game`),
  KEY `id_user` (`id_user`),
  KEY `id_user_2` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `movies` (
  `id_movie` varchar(9) NOT NULL,
  `title` text NOT NULL,
  `year` int(4) NOT NULL,
  `rating` decimal(1,1) NOT NULL,
  `img_path` text NOT NULL,
  PRIMARY KEY (`id_movie`),
  KEY `id_movie` (`id_movie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `movies` (`id_movie`, `title`, `year`, `rating`, `img_path`) VALUES
('tt0071282', 'The Cars That Ate Paris', 1974, '0.0', 'https://m.media-amazon.com/images/M/MV5BNTVmOTdmYTktY2JmNi00YzJmLWJjNGItMjNmOWM1MDM0MjZiL2ltYWdlXkEyXkFqcGdeQXVyMTYxNjkxOQ@@._V1_SX300.jpg'),
('tt0081698', 'Used Cars', 1980, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTAzOTBhNTAtMzY5MS00YjcwLWIzYWItNWI1NzQ4YjcxY2E2XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg'),
('tt0200027', 'Riding in Cars with Boys', 2001, '0.0', 'https://m.media-amazon.com/images/M/MV5BOGM5MzU5NTgtMmJjZC00Y2E2LThhZGQtMGE5YzUxZTgwZDdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
('tt0317219', 'Cars', 2006, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg'),
('tt1216475', 'Cars 2', 2011, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_SX300.jpg'),
('tt1282139', 'Cars of the Revolution', 2008, '0.0', 'https://m.media-amazon.com/images/M/MV5BZmE3NGIzZmEtZTBhNi00ZDYzLWJmZjItZWRmMmYzYzVmNTViXkEyXkFqcGdeQXVyMjExNjgyMTc@._V1_SX300.jpg'),
('tt2314952', 'Comedians in Cars Getting Coffee', 2012, '0.0', 'https://m.media-amazon.com/images/M/MV5BMWExMDNjMGYtNDcwYy00ZmY4LTliY2UtYWNiNjY4NDY2MTBkXkEyXkFqcGdeQXVyMzU3MTc5OTE@._V1_SX300.jpg'),
('tt2338096', 'Counting Cars', 2012, '0.0', 'https://m.media-amazon.com/images/M/MV5BOGYxOTM2MjgtZWFlOC00Y2UwLWI3MzItMWMyNjY0YWY5NmEyXkEyXkFqcGdeQXVyMTAwMzM3NDI3._V1_SX300.jpg'),
('tt3606752', 'Cars 3', 2017, '0.0', 'https://m.media-amazon.com/images/M/MV5BMTc0NzU2OTYyN15BMl5BanBnXkFtZTgwMTkwOTg2MTI@._V1_SX300.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
