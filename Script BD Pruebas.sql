-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2025 a las 21:04:49
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
-- Estructura de tabla para la tabla `bans`
--

CREATE TABLE `bans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `champion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `champions`
--

CREATE TABLE `champions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `champions`
--

INSERT INTO `champions` (`id`, `name`) VALUES
(1, 'Aatrox'),
(2, 'Ahri'),
(3, 'Akali'),
(4, 'Akshan'),
(5, 'Alistar'),
(6, 'Ambessa'),
(7, 'Amumu'),
(8, 'Anivia'),
(9, 'Annie'),
(10, 'Aphelios'),
(11, 'Ashe'),
(12, 'Aurelion Sol'),
(13, 'Aurora'),
(14, 'Azir'),
(17, 'Bard'),
(18, 'Bel\'Veth'),
(19, 'Blitzcrank'),
(20, 'Brand'),
(176, 'Braum'),
(22, 'Briar'),
(23, 'Caitlyn'),
(24, 'Camille'),
(25, 'Cassiopeia'),
(26, 'Cho\'Gath'),
(27, 'Corki'),
(28, 'Darius'),
(29, 'Diana'),
(30, 'Dr. Mundo'),
(31, 'Draven'),
(32, 'Ekko'),
(33, 'Elise'),
(34, 'Evelynn'),
(35, 'Ezreal'),
(36, 'Fiddlesticks'),
(37, 'Fiora'),
(38, 'Fizz'),
(39, 'Galio'),
(40, 'Gangplank'),
(42, 'Garen'),
(43, 'Gnar'),
(44, 'Gragas'),
(45, 'Graves'),
(46, 'Gwen'),
(47, 'Hecarim'),
(48, 'Heimerdinger'),
(49, 'Hwei'),
(50, 'Illaoi'),
(51, 'Irelia'),
(52, 'Ivern'),
(53, 'Janna'),
(54, 'Jarvan IV'),
(55, 'Jax'),
(56, 'Jayce'),
(57, 'Jhin'),
(58, 'Jinx'),
(59, 'K\'Sante'),
(60, 'Kai\'Sa'),
(61, 'Kalista'),
(62, 'Karma'),
(63, 'Karthus'),
(64, 'Kassadin'),
(65, 'Katarina'),
(66, 'Kayle'),
(67, 'Kayn'),
(68, 'Kennen'),
(69, 'Kha\'Zix'),
(70, 'Kindred'),
(71, 'Kled'),
(72, 'Kog\'Maw'),
(73, 'LeBlanc'),
(74, 'Lee Sin'),
(75, 'Leona'),
(76, 'Lillia'),
(77, 'Lissandra'),
(78, 'Lucian'),
(79, 'Lulu'),
(80, 'Lux'),
(81, 'Malphite'),
(82, 'Malzahar'),
(83, 'Maokai'),
(84, 'Master Yi'),
(85, 'Mel'),
(86, 'Milio'),
(87, 'Miss Fortune'),
(88, 'Mordekaiser'),
(89, 'Morgana'),
(90, 'Naafiri'),
(91, 'Nami'),
(92, 'Nasus'),
(93, 'Nautilus'),
(94, 'Neeko'),
(95, 'Nidalee'),
(96, 'Nilah'),
(97, 'Nocturne'),
(98, 'Nunu & Willump'),
(99, 'Olaf'),
(100, 'Orianna'),
(101, 'Ornn'),
(102, 'Pantheon'),
(103, 'Poppy'),
(104, 'Pyke'),
(105, 'Qiyana'),
(106, 'Quinn'),
(107, 'Rakan'),
(108, 'Rammus'),
(109, 'Rek\'Sai'),
(110, 'Rell'),
(111, 'Renata Glasc'),
(112, 'Renekton'),
(113, 'Rengar'),
(114, 'Riven'),
(115, 'Rumble'),
(116, 'Ryze'),
(117, 'Samira'),
(118, 'Sejuani'),
(119, 'Senna'),
(120, 'Seraphine'),
(121, 'Sett'),
(122, 'Shaco'),
(123, 'Shen'),
(124, 'Shyvanna'),
(125, 'Singed'),
(126, 'Sion'),
(127, 'Sivir'),
(128, 'Skarner'),
(129, 'Smolder'),
(130, 'Sona'),
(131, 'Soraka'),
(132, 'Swain'),
(133, 'Sylas'),
(134, 'Syndra'),
(135, 'Tahm Kench'),
(136, 'Taliyah'),
(137, 'Talon'),
(138, 'Taric'),
(139, 'Teemo'),
(140, 'Thresh'),
(141, 'Tristana'),
(142, 'Trundle'),
(143, 'Tryndamere'),
(144, 'Twisted Fate'),
(145, 'Twitch'),
(146, 'Udyr'),
(147, 'Urgot'),
(148, 'Varus'),
(149, 'Vayne'),
(150, 'Veigar'),
(151, 'Vel\'Koz'),
(152, 'Vex'),
(153, 'Vi'),
(154, 'Viego'),
(155, 'Viktor'),
(156, 'Vladimir'),
(157, 'Volibear'),
(158, 'Warwick'),
(160, 'Wukong'),
(161, 'Xayah'),
(162, 'Xerath'),
(163, 'Xin Zhao'),
(164, 'Yasuo'),
(165, 'Yone'),
(166, 'Yorick'),
(167, 'Yuumi'),
(168, 'Zac'),
(169, 'Zed'),
(170, 'Zeri'),
(171, 'Ziggs'),
(172, 'Zilean'),
(173, 'Zoe'),
(174, 'Zyra');

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
  `hoster` varchar(50) NOT NULL,
  `permanent` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `username`, `tag`, `description`, `duration`, `hoster`, `permanent`) VALUES
(1, 'player1', '#EUW1', 'Description for player1', '2025-04-15', 'Jesusito', 1),
(2, 'player2', '#EUW2', 'Description for player2', '2025-04-18', 'Jesusito', 1),
(3, 'player3', '#EUW3', 'Description for player3', '2025-04-19', 'Jesusito', 0),
(4, 'player4', '#EUW4', 'Description for player4', '2025-04-24', 'Jesusito', 0),
(5, 'player5', '#EUW5', 'Description for player5', '2025-04-12', 'Jesusito', 0),
(6, 'player6', '#EUW6', 'Description for player6', '2025-04-05', 'Jesusito', 1),
(7, 'player7', '#EUW7', 'Description for player7', '2025-04-10', 'Jesusito', 1),
(8, 'player8', '#EUW8', 'Description for player8', '2025-04-30', 'Jesusito', 0),
(9, 'player9', '#EUW9', 'Description for player9', '2025-04-28', 'Jesusito', 1),
(10, 'player10', '#EUW10', 'Description for player10', '2025-04-15', 'Jesusito', 0),
(11, 'player11', '#EUW11', 'Description for player11', '2025-04-22', 'Jesusito', 0),
(12, 'player12', '#EUW12', 'Description for player12', '2025-04-07', 'Jesusito', 1),
(13, 'player13', '#EUW13', 'Description for player13', '2025-04-01', 'Jesusito', 0),
(14, 'player14', '#EUW14', 'Description for player14', '2025-04-29', 'Jesusito', 1),
(15, 'player15', '#EUW15', 'Description for player15', '2025-04-30', 'Jesusito', 1),
(16, 'player16', '#EUW16', 'Description for player16', '2025-04-15', 'Jesusito', 1),
(17, 'player17', '#EUW17', 'Description for player17', '2025-04-02', 'Jesusito', 0),
(18, 'player18', '#EUW18', 'Description for player18', '2025-05-05', 'Jesusito', 0),
(19, 'player19', '#EUW19', 'Description for player19', '2025-06-20', 'Jesusito', 1),
(20, 'player20', '#EUW20', 'Description for player20', '2025-06-15', 'Jesusito', 0);

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
(1, 'Pyky', 'pykylolcgm@gmail.com', '1234', 'ADMIN'),
(2, 'Jesusito', 'hoster1@example.com', '4321', 'HOSTER'),
(7, 'Keys', 'keyslolcgm@gmail.com', 'abam1234', 'ADMIN'),
(8, 'Aeryn', 'aerynlolcgm@gmail.com', 'abam1234', 'HOSTER'),
(9, 'CannonMinion', 'cannonlolcgm@gmail.com', 'abam1234', 'HOSTER'),
(10, 'Griefer', 'grieferlolcgm@gmail.com', 'abam1234', 'HOSTER');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bans`
--
ALTER TABLE `bans`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`champion_id`);

--
-- Indices de la tabla `champions`
--
ALTER TABLE `champions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
-- AUTO_INCREMENT de la tabla `bans`
--
ALTER TABLE `bans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `champions`
--
ALTER TABLE `champions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
