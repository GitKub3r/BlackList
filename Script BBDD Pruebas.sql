-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: blacklist_test
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bans`
--

DROP TABLE IF EXISTS `bans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `champion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`champion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bans`
--

LOCK TABLES `bans` WRITE;
/*!40000 ALTER TABLE `bans` DISABLE KEYS */;
INSERT INTO `bans` VALUES (2,1,12),(3,1,119),(4,1,122),(1,1,169),(31,20,12),(32,20,139),(30,20,169),(29,24,104),(27,24,139),(28,24,169);
/*!40000 ALTER TABLE `bans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `champions`
--

DROP TABLE IF EXISTS `champions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `champions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `champions`
--

LOCK TABLES `champions` WRITE;
/*!40000 ALTER TABLE `champions` DISABLE KEYS */;
INSERT INTO `champions` VALUES (1,'Aatrox'),(2,'Ahri'),(3,'Akali'),(4,'Akshan'),(5,'Alistar'),(6,'Ambessa'),(7,'Amumu'),(8,'Anivia'),(9,'Annie'),(10,'Aphelios'),(11,'Ashe'),(12,'Aurelion Sol'),(13,'Aurora'),(14,'Azir'),(17,'Bard'),(18,'Bel\'Veth'),(19,'Blitzcrank'),(20,'Brand'),(176,'Braum'),(22,'Briar'),(23,'Caitlyn'),(24,'Camille'),(25,'Cassiopeia'),(26,'Cho\'Gath'),(27,'Corki'),(28,'Darius'),(29,'Diana'),(30,'Dr. Mundo'),(31,'Draven'),(32,'Ekko'),(33,'Elise'),(34,'Evelynn'),(35,'Ezreal'),(36,'Fiddlesticks'),(37,'Fiora'),(38,'Fizz'),(39,'Galio'),(40,'Gangplank'),(42,'Garen'),(43,'Gnar'),(44,'Gragas'),(45,'Graves'),(46,'Gwen'),(47,'Hecarim'),(48,'Heimerdinger'),(49,'Hwei'),(50,'Illaoi'),(51,'Irelia'),(52,'Ivern'),(53,'Janna'),(54,'Jarvan IV'),(55,'Jax'),(56,'Jayce'),(57,'Jhin'),(58,'Jinx'),(59,'K\'Sante'),(60,'Kai\'Sa'),(61,'Kalista'),(62,'Karma'),(63,'Karthus'),(64,'Kassadin'),(65,'Katarina'),(66,'Kayle'),(67,'Kayn'),(68,'Kennen'),(69,'Kha\'Zix'),(70,'Kindred'),(71,'Kled'),(72,'Kog\'Maw'),(73,'LeBlanc'),(74,'Lee Sin'),(75,'Leona'),(76,'Lillia'),(77,'Lissandra'),(78,'Lucian'),(79,'Lulu'),(80,'Lux'),(81,'Malphite'),(82,'Malzahar'),(83,'Maokai'),(84,'Master Yi'),(85,'Mel'),(86,'Milio'),(87,'Miss Fortune'),(88,'Mordekaiser'),(89,'Morgana'),(90,'Naafiri'),(91,'Nami'),(92,'Nasus'),(93,'Nautilus'),(94,'Neeko'),(95,'Nidalee'),(96,'Nilah'),(97,'Nocturne'),(98,'Nunu & Willump'),(99,'Olaf'),(100,'Orianna'),(101,'Ornn'),(102,'Pantheon'),(103,'Poppy'),(104,'Pyke'),(105,'Qiyana'),(106,'Quinn'),(107,'Rakan'),(108,'Rammus'),(109,'Rek\'Sai'),(110,'Rell'),(111,'Renata Glasc'),(112,'Renekton'),(113,'Rengar'),(114,'Riven'),(115,'Rumble'),(116,'Ryze'),(117,'Samira'),(118,'Sejuani'),(119,'Senna'),(120,'Seraphine'),(121,'Sett'),(122,'Shaco'),(123,'Shen'),(124,'Shyvanna'),(125,'Singed'),(126,'Sion'),(127,'Sivir'),(128,'Skarner'),(129,'Smolder'),(130,'Sona'),(131,'Soraka'),(132,'Swain'),(133,'Sylas'),(134,'Syndra'),(135,'Tahm Kench'),(136,'Taliyah'),(137,'Talon'),(138,'Taric'),(139,'Teemo'),(140,'Thresh'),(141,'Tristana'),(142,'Trundle'),(143,'Tryndamere'),(144,'Twisted Fate'),(145,'Twitch'),(146,'Udyr'),(147,'Urgot'),(148,'Varus'),(149,'Vayne'),(150,'Veigar'),(151,'Vel\'Koz'),(152,'Vex'),(153,'Vi'),(154,'Viego'),(155,'Viktor'),(156,'Vladimir'),(157,'Volibear'),(158,'Warwick'),(160,'Wukong'),(161,'Xayah'),(162,'Xerath'),(163,'Xin Zhao'),(164,'Yasuo'),(165,'Yone'),(166,'Yorick'),(167,'Yuumi'),(168,'Zac'),(169,'Zed'),(170,'Zeri'),(171,'Ziggs'),(172,'Zilean'),(173,'Zoe'),(174,'Zyra');
/*!40000 ALTER TABLE `champions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `action` enum('BAN','UNBAN') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` date DEFAULT NULL,
  `hoster` varchar(50) NOT NULL,
  `permanent` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_players_hoster` (`hoster`),
  CONSTRAINT `fk_players_hoster` FOREIGN KEY (`hoster`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (31,'Minionward','Tyrant','Makes me wet',NULL,'Spicy Ravioli',1);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` enum('ADMIN','HOSTER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'Aeryn','aerynlolcgm@gmail.com','$2a$10$FB1hXArROyTzQyGQhUEeMuSk4KYUpXpJEYsmSciH0HJdWYDDqQakW','HOSTER'),(23,'Keys','keyslolcgm@gmail.com','$2a$10$1uaWp7SUNbR7GJDzXrrB3.WxPsSktxuUJ78xL.6sKvi9rcY.ftHh.','HOSTER'),(24,'Spicy Ravioli','ravilolcgm@gmail.com','$2a$10$E4Avg5NbcZLOq9KKgs9Gp.MjFYbOYfWcmaOdpKcUi8aEmCNlYedWu','HOSTER'),(25,'Admin LOLCGM','adminlolcgm@gmail.com','$2a$10$79hZL3ZR4AdXDQmFF6Po4uuyxIoFr9f94XCi58Blf0XRgc77SVyrm','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 20:57:51
