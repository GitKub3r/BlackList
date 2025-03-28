-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2025 a las 12:27:26
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
-- Base de datos: `blacklist`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `action` enum('BAN','UNBAN') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'player1', '#EUW1', 'Description for player1', '2023-01-01', 'hoster_user1'),
(2, 'player2', '#EUW2', 'Description for player2', '2023-01-02', 'hoster_user1'),
(3, 'player3', '#EUW3', 'Description for player3', '2023-01-03', 'hoster_user1'),
(4, 'player4', '#EUW4', 'Description for player4', '2023-01-04', 'hoster_user1'),
(5, 'player5', '#EUW5', 'Description for player5', '2023-01-05', 'hoster_user1'),
(6, 'player6', '#EUW6', 'Description for player6', '2023-01-06', 'hoster_user1'),
(7, 'player7', '#EUW7', 'Description for player7', '2023-01-07', 'hoster_user1'),
(8, 'player8', '#EUW8', 'Description for player8', '2023-01-08', 'hoster_user1'),
(9, 'player9', '#EUW9', 'Description for player9', '2023-01-09', 'hoster_user1'),
(10, 'player10', '#EUW10', 'Description for player10', '2023-01-10', 'hoster_user1'),
(11, 'player11', '#EUW11', 'Description for player11', '2023-01-11', 'hoster_user1'),
(12, 'player12', '#EUW12', 'Description for player12', '2023-01-12', 'hoster_user1'),
(13, 'player13', '#EUW13', 'Description for player13', '2023-01-13', 'hoster_user1'),
(14, 'player14', '#EUW14', 'Description for player14', '2023-01-14', 'hoster_user1'),
(15, 'player15', '#EUW15', 'Description for player15', '2023-01-15', 'hoster_user1'),
(16, 'player16', '#EUW16', 'Description for player16', '2023-01-16', 'hoster_user1'),
(17, 'player17', '#EUW17', 'Description for player17', '2023-01-17', 'hoster_user1'),
(18, 'player18', '#EUW18', 'Description for player18', '2023-01-18', 'hoster_user1'),
(19, 'player19', '#EUW19', 'Description for player19', '2023-01-19', 'hoster_user1'),
(20, 'player20', '#EUW20', 'Description for player20', '2023-01-20', 'hoster_user1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` enum('ADMIN','HOSTER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `type`) VALUES
(1, 'admin_user', 'admin@example.com', 'securepassword1', 'ADMIN'),
(2, 'hoster_user1', 'hoster1@example.com', 'securepassword2', 'HOSTER'),
(3, 'hoster_user2', 'hoster2@example.com', 'securepassword3', 'HOSTER');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_players_hoster` (`hoster`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
