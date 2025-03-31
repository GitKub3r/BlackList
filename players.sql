-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2025 a las 18:01:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blacklist_test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` date DEFAULT NULL,
  `hoster` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `username`, `tag`, `description`, `duration`, `hoster`) VALUES
(1, 'player1', '#EUW1', 'Description for player1', '2025-04-15', 'hoster_user1'),
(2, 'player2', '#EUW2', 'Description for player2', '2025-04-18', 'hoster_user1'),
(3, 'player3', '#EUW3', 'Description for player3', '2025-04-19', 'hoster_user1'),
(4, 'player4', '#EUW4', 'Description for player4', '2025-04-24', 'hoster_user1'),
(5, 'player5', '#EUW5', 'Description for player5', '2025-04-12', 'hoster_user1'),
(6, 'player6', '#EUW6', 'Description for player6', '2025-04-05', 'hoster_user1'),
(7, 'player7', '#EUW7', 'Description for player7', '2025-04-10', 'hoster_user1'),
(8, 'player8', '#EUW8', 'Description for player8', '2025-04-30', 'hoster_user1'),
(9, 'player9', '#EUW9', 'Description for player9', '2025-04-28', 'hoster_user1'),
(10, 'player10', '#EUW10', 'Description for player10', '2025-04-15', 'hoster_user1'),
(11, 'player11', '#EUW11', 'Description for player11', '2025-04-22', 'hoster_user1'),
(12, 'player12', '#EUW12', 'Description for player12', '2025-04-07', 'hoster_user1'),
(13, 'player13', '#EUW13', 'Description for player13', '2025-04-01', 'hoster_user1'),
(14, 'player14', '#EUW14', 'Description for player14', '2025-04-29', 'hoster_user1'),
(15, 'player15', '#EUW15', 'Description for player15', '2025-04-30', 'hoster_user1'),
(16, 'player16', '#EUW16', 'Description for player16', '2025-04-15', 'hoster_user1'),
(17, 'player17', '#EUW17', 'Description for player17', '2025-04-02', 'hoster_user1'),
(18, 'player18', '#EUW18', 'Description for player18', '2025-05-05', 'hoster_user1'),
(19, 'player19', '#EUW19', 'Description for player19', '2025-06-20', 'hoster_user1'),
(20, 'player20', '#EUW20', 'Description for player20', '2025-06-15', 'hoster_user1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_players_hoster` (`hoster`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `fk_players_hoster` FOREIGN KEY (`hoster`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
