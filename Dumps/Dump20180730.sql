-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: leldb
-- ------------------------------------------------------
-- Server version	5.5.60-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `behaviouralresponse`
--

DROP TABLE IF EXISTS `behaviouralresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `behaviouralresponse` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `SymbolId` bigint(20) NOT NULL,
  `AuthorId` bigint(20) NOT NULL,
  `Expression` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_AuthorId_Action_idx` (`AuthorId`),
  KEY `FK_SymbolId_Action_idx` (`SymbolId`),
  CONSTRAINT `FK_AuthorId_Action` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_SymbolId_Action` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behaviouralresponse`
--

LOCK TABLES `behaviouralresponse` WRITE;
/*!40000 ALTER TABLE `behaviouralresponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `behaviouralresponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Content` varchar(500) DEFAULT NULL,
  `AuthorId` bigint(20) DEFAULT NULL,
  `ReplyToComment` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK_UserId_Comment_UserId` FOREIGN KEY (`Id`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Esto es un comentario que me gustar√≠a que se guardase bien. (editado, de nuevo)',1,NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lelproject`
--

DROP TABLE IF EXISTS `lelproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lelproject` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `AuthorId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Symbol_User_UserId_idx` (`AuthorId`),
  KEY `FK_LELProject_User_UserId_idx` (`AuthorId`),
  CONSTRAINT `FK_LELProjectl_User_UserId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lelproject`
--

LOCK TABLES `lelproject` WRITE;
/*!40000 ALTER TABLE `lelproject` DISABLE KEYS */;
INSERT INTO `lelproject` VALUES (1,'Oh El mejor Lel!',1),(2,'asasdasd',1),(3,'sdfsdfsdf',1);
/*!40000 ALTER TABLE `lelproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lelprojectteam`
--

DROP TABLE IF EXISTS `lelprojectteam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lelprojectteam` (
  `LelProjectId` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `IsAdmin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`LelProjectId`,`UserId`),
  KEY `FK_LelProjectId_idx` (`LelProjectId`),
  KEY `FK_UserId_idx` (`UserId`),
  CONSTRAINT `FK_LelProjectId` FOREIGN KEY (`LelProjectId`) REFERENCES `lelproject` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lelprojectteam`
--

LOCK TABLES `lelprojectteam` WRITE;
/*!40000 ALTER TABLE `lelprojectteam` DISABLE KEYS */;
/*!40000 ALTER TABLE `lelprojectteam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notion`
--

DROP TABLE IF EXISTS `notion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notion` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `AuthorId` bigint(20) NOT NULL,
  `SymbolId` bigint(20) NOT NULL,
  `Expression` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Notion_Symbol_SymbolId_idx` (`SymbolId`),
  KEY `FK_Notion_AuthorId_idx` (`AuthorId`),
  CONSTRAINT `FK_Notion_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Notion_SymbolId` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notion`
--

LOCK TABLES `notion` WRITE;
/*!40000 ALTER TABLE `notion` DISABLE KEYS */;
INSERT INTO `notion` VALUES (1,1,1,'El {\"id\":1,\"lelProjectId\":1,\"name\":\"Cliente\"} {\"id\":5,\"lelProjectId\":1,\"name\":\"Productor\"}');
/*!40000 ALTER TABLE `notion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `Id` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('Administrator','All access role');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symbol`
--

DROP TABLE IF EXISTS `symbol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symbol` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Category` varchar(255) DEFAULT NULL,
  `LELProjectId` bigint(20) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `AuthorId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Symbol_LELProjectId` (`LELProjectId`),
  KEY `FK_Symbol_User_UserId_idx` (`AuthorId`),
  CONSTRAINT `FK_Symbol_LELProject_LELProjectId` FOREIGN KEY (`LELProjectId`) REFERENCES `lelproject` (`Id`),
  CONSTRAINT `FK_Symbol_User_UserId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symbol`
--

LOCK TABLES `symbol` WRITE;
/*!40000 ALTER TABLE `symbol` DISABLE KEYS */;
INSERT INTO `symbol` VALUES (1,'Verb',1,'Cliente',1),(4,'Subject',1,'Aseguradora',1),(5,'Object',1,'Productor',1);
/*!40000 ALTER TABLE `symbol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `synonym`
--

DROP TABLE IF EXISTS `synonym`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synonym` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `SymbolId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Synonim_Symbol_SymbolId_idx` (`SymbolId`),
  CONSTRAINT `FK_Synonim_Symbol_SymbolId` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `synonym`
--

LOCK TABLES `synonym` WRITE;
/*!40000 ALTER TABLE `synonym` DISABLE KEYS */;
INSERT INTO `synonym` VALUES (14,'syn1',5),(16,'syn3',5),(22,'asdf',1),(23,'asdf',1),(24,'asdf',1),(25,'asf',1),(26,'asdf',1);
/*!40000 ALTER TABLE `synonym` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `UserName` varchar(45) DEFAULT NULL,
  `RoleId` varchar(255) DEFAULT NULL,
  `PasswordSalt` varbinary(128) DEFAULT NULL,
  `PasswordHash` varbinary(128) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_User_Role_RoleId_idx` (`RoleId`),
  CONSTRAINT `FK_User_Role_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Matias','Sarmiento','Matute','Administrator',NULL,NULL,NULL),(2,'Mariela','Zurbano','Puercazo',NULL,NULL,NULL,NULL),(3,'Yunque','Sarmiento','Alfa',NULL,NULL,NULL,NULL),(4,'Rebel','Sarmiento','Pitufresa',NULL,NULL,NULL,NULL),(5,'Yunque','Sarmiento','Queso',NULL,'™N\·¯Wä\ƒG\ÎO◊ü\Á¶+ªÄ\⁄zRº\‹\ÂU\Ë≠_tÖ˜“Ç£Ü\n©*Ù\Ë\√\Íh∏\‰Ç$¯.\Z¨\≈\ Xˆ\„	\È\ÏWX•\÷\„-\÷ˆ\⁄\—pı˘Sú[¯\”\‘3\Âvõ¸¢\0\ÂÅß\⁄\‚\Zï\»\‡\Z$Y\„°x°\0◊í\⁄\◊Ù˚ì','mºπ®Ú\∆O_Œçüv%a∫3˛˙\”<\Œ\€>ù≤ÇI\‹\'N+`<i©\\Q\n˜A\ÀLr\Àc£Å\n\ﬁN*vjYH\„¥0u','queso@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-30 20:45:11
