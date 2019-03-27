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
  CONSTRAINT `FK_AuthorId_Action` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SymbolId_Action` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `FK_LELProjectl_User_UserId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `FK_LelProjectId` FOREIGN KEY (`LelProjectId`) REFERENCES `lelproject` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `FK_Notion_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Notion_SymbolId` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  CONSTRAINT `FK_Symbol_LELProject_LELProjectId` FOREIGN KEY (`LELProjectId`) REFERENCES `lelproject` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Symbol_User_UserId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `symbolcomment`
--

DROP TABLE IF EXISTS `symbolcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symbolcomment` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `SymbolId` bigint(20) DEFAULT NULL,
  `Content` varchar(500) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `SymbolCommentId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `FK_UserId_Author_idx` (`UserId`),
  KEY `FK_ReplyToComment_idx` (`SymbolCommentId`),
  KEY `FK_SymbolId_idx` (`SymbolId`),
  KEY `FK_SymbolId_Comment_idx` (`SymbolId`),
  CONSTRAINT `FK_SymbolCommentId` FOREIGN KEY (`SymbolCommentId`) REFERENCES `symbolcomment` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SymbolId_Comment` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_UserId_Author` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `symbollike`
--

DROP TABLE IF EXISTS `symbollike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symbollike` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `SymbolId` bigint(20) NOT NULL,
  `AuthorId` bigint(20) NOT NULL,
  `IsLike` tinyint(4) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_AuthorId_idx` (`AuthorId`),
  KEY `FK_SymbolId_idx` (`SymbolId`),
  CONSTRAINT `FK_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_SymbolId` FOREIGN KEY (`SymbolId`) REFERENCES `symbol` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-26 21:08:45
