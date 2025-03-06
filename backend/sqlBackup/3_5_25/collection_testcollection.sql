-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: collection
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `testcollection`
--

DROP TABLE IF EXISTS `testcollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testcollection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `format` varchar(20) NOT NULL,
  `pack` varchar(100) DEFAULT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `year` int NOT NULL,
  `director` varchar(100) DEFAULT NULL,
  `runtime` int NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `seen` tinyint(1) DEFAULT '1',
  `country` varchar(50) DEFAULT 'USA',
  `type` varchar(20) DEFAULT 'Movie',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcollection`
--

LOCK TABLES `testcollection` WRITE;
/*!40000 ALTER TABLE `testcollection` DISABLE KEYS */;
INSERT INTO `testcollection` VALUES (5,'Anatomy of a Murder','dvd',NULL,'Criterion',1959,NULL,151,'Courtroom Drama, Crime',1,'USA','Movie'),(6,'Back to the Future','bluray','Back to the Future Trilogy',NULL,1985,NULL,116,'Adventure, Comedy, Scifi',1,'USA','Movie'),(7,'Back to the Future Part II','bluray','Back to the Future Trilogy',NULL,1989,NULL,108,'Adventure, Comedy, Scifi',1,'USA','Movie'),(8,'Back to the Future Part III','bluray','Back to the Future Trilogy',NULL,1990,NULL,118,'Adventure, Comedy, Scifi',1,'USA','Movie'),(10,'Jacob\'s Ladder','bluray',NULL,NULL,1990,NULL,113,'Drama, Horror',1,'USA','Movie'),(12,'Pulp Fiction','bluray','Tarantino XX',NULL,1994,NULL,144,'Crime',1,'USA','Movie'),(14,'Kill Bill: Vol. 1','bluray','Tarantino XX',NULL,2003,NULL,111,'Kung Fu',1,'USA','Movie'),(15,'Kill Bill: Vol. 2','bluray','Tarantino XX',NULL,2004,NULL,137,'Kung Fu, Western',1,'USA','Movie'),(20,'Brazil','bluray',NULL,'Criterion',1985,NULL,132,'Comedy, Scifi',1,'USA','Movie'),(22,'Rear Window','dvd','Jimmy Stewart: Hollywood Legend Collcetion',NULL,1954,NULL,112,'Mystery, Thriller',1,'USA','Movie'),(24,'Everybody Loves Raymond Season 1','dvd','Everybody Loves Raymond: The Complete Series House',NULL,1996,NULL,22,'Comedy',1,'USA','TV'),(28,'Everybody Loves Raymond Season 5','dvd','Everybody Loves Raymond: The Complete Series House',NULL,2000,NULL,22,'Comedy',1,'USA','TV'),(33,'Dumb and Dumber','Movies Anywhere',NULL,NULL,1994,NULL,107,'Comedy',1,'USA','Movie'),(34,'Edward Scissorhands','Movies Anywhere',NULL,NULL,1990,NULL,105,'Drama, Fantasy, Romance',1,'USA','Movie'),(42,'Dead Alive','dvd',NULL,NULL,1992,'Peter Jackson',104,'Comedy, Horror',1,'USA','Movie'),(43,'Fight Club','bluray',NULL,NULL,1999,'David Fincher',140,'Comedy, Drama',1,'USA','Movie'),(44,'The Social Network','bluray',NULL,NULL,2010,'David Fincher',120,'Biography, Drama',1,'USA','Movie'),(48,'Seven','bluray',NULL,NULL,1995,'David Fincher',120,'Crime, Thriller',1,'USA','Movie'),(49,'Coraline','Bluray',NULL,NULL,2009,'Henry Selick',100,'Animation',1,'USA','Movie'),(50,'Punch Drunk Love','Bluray',NULL,'Criterion',2002,'Paul Thomas Anderson',90,'Comedy, Drama',1,'USA','Movie'),(51,'Videodrome','Bluray',NULL,NULL,1983,'David Cronenberg',87,'Horror, Scifi',1,'USA','Movie'),(52,'Nacho Libre','dvd',NULL,NULL,2006,'Jarted Hess',92,'Comedy',1,'USA','Movie'),(53,'Pink Floyd: The Wall','dvd',NULL,NULL,1982,'Alan Parker',95,'Drama, Music',1,'USA','Movie'),(54,'Waking Life','dvd',NULL,NULL,2001,'Richard Linklater',99,'Animation, Drama',1,'USA','Movie');
/*!40000 ALTER TABLE `testcollection` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 23:54:53
