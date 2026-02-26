-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: hotelaria
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adicionais`
--

DROP TABLE IF EXISTS `adicionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adicionais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(225) NOT NULL,
  `preco` double(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adicionais`
--

LOCK TABLES `adicionais` WRITE;
/*!40000 ALTER TABLE `adicionais` DISABLE KEYS */;
INSERT INTO `adicionais` VALUES (2,'Kevin',9999.99),(3,'Keven',1.00),(4,'teste rota',123.00);
/*!40000 ALTER TABLE `adicionais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'Zelador'),(2,'Atendente'),(3,'cliente'),(4,'Admin');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `telefone` varchar(225) NOT NULL,
  `cpf` varchar(225) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `id_cargo` int(11) DEFAULT 3,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `fk_cargo` (`id_cargo`),
  CONSTRAINT `fk_cargo` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Kevin','teste@gmail.com','1111 2222','43359146813','teste123',3),(4,'Keven','Keven@gmail.com','12345678','12253347912','senha123',3),(5,'teste','teste2@gmail.com','12312321123','12341231132','$2y$10$zUPEV.NzBvRYxu1VIgY5reyEF1ZmyMWcwkGJ1xPrAvZYl4Xl8Wn86',3),(6,'Cliente Teste','cliente.teste@example.com','','','123456',3),(9,'Teste','teste3@gmail.com','1598825-1234','35456778901','$2b$10$9dpt279D10to.oVwep/WhOoaS3159t0BRPZ6tJmfVg/FliV00tD5e',3),(14,'Teste','teste4@gmail.com','1598825-1334','45646445645','$2b$10$xbooKLErZsm3jja7R828EeWubob81nshNxY92qOV0mQTFfPmGctdq',3),(28,'Teste','teste5@gmail.com','1598825-1734','45646445685','$2b$10$BF5nMMlt41HHzThom4.rpe76b8r2iBF02bs1vHlBEHPhTE.7Zb9yG',3);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens`
--

DROP TABLE IF EXISTS `imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `caminho` varchar(350) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens`
--

LOCK TABLES `imagens` WRITE;
/*!40000 ALTER TABLE `imagens` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens_quartos`
--

DROP TABLE IF EXISTS `imagens_quartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens_quartos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagem_id` int(11) NOT NULL,
  `quarto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `imagem_id` (`imagem_id`,`quarto_id`),
  KEY `quarto_id` (`quarto_id`),
  CONSTRAINT `imagens_quartos_ibfk_1` FOREIGN KEY (`imagem_id`) REFERENCES `imagens` (`id`),
  CONSTRAINT `imagens_quartos_ibfk_2` FOREIGN KEY (`quarto_id`) REFERENCES `quartos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens_quartos`
--

LOCK TABLES `imagens_quartos` WRITE;
/*!40000 ALTER TABLE `imagens_quartos` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagens_quartos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp(),
  `pagamento` enum('PIX','Dinheiro','Debito','Credito') NOT NULL CHECK (`pagamento` in ('PIX','Dinheiro','Debito','Credito')),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (3,1,1,'2025-06-06 17:13:55','Credito'),(4,2,4,'2025-09-24 14:42:21','PIX'),(5,1,5,'2025-10-30 17:09:41','PIX'),(10,1,4,'2026-02-12 14:23:41','PIX'),(11,1,4,'2026-02-12 14:24:23','PIX'),(66,1,5,'2026-02-25 14:46:14','PIX'),(67,1,5,'2026-02-25 14:46:20','PIX'),(68,1,5,'2026-02-25 14:46:44','PIX'),(69,1,5,'2026-02-25 14:48:00','PIX'),(71,1,5,'2026-02-25 14:50:15','PIX'),(73,1,5,'2026-02-25 14:50:25','PIX'),(75,1,5,'2026-02-25 14:50:31','PIX'),(77,1,5,'2026-02-25 14:51:27','PIX'),(79,1,5,'2026-02-25 14:51:32','PIX'),(81,1,5,'2026-02-25 14:51:37','PIX'),(82,1,5,'2026-02-25 14:51:46','PIX'),(84,1,5,'2026-02-25 14:51:50','PIX'),(86,1,5,'2026-02-25 14:52:12','PIX'),(87,1,5,'2026-02-25 14:52:24','PIX'),(88,1,5,'2026-02-25 14:53:01','PIX'),(91,1,5,'2026-02-25 14:53:07','PIX'),(93,1,5,'2026-02-25 14:53:44','PIX'),(95,1,5,'2026-02-25 14:53:56','PIX'),(97,1,5,'2026-02-25 14:54:54','PIX'),(99,1,5,'2026-02-25 14:55:08','PIX'),(100,1,5,'2026-02-25 14:56:35','PIX'),(104,1,5,'2026-02-25 15:01:29','PIX'),(106,1,5,'2026-02-25 15:02:49','PIX'),(135,1,5,'2026-02-25 15:20:53','PIX'),(140,1,5,'2026-02-25 15:26:28','PIX'),(141,1,5,'2026-02-25 15:27:11','PIX'),(142,1,5,'2026-02-25 15:31:41','PIX'),(143,1,5,'2026-02-25 15:32:09','PIX'),(145,1,5,'2026-02-25 15:32:19','PIX'),(147,1,5,'2026-02-25 15:34:45','PIX'),(149,1,5,'2026-02-25 15:35:15','PIX'),(150,1,5,'2026-02-25 15:36:04','PIX'),(152,1,5,'2026-02-25 15:45:25','PIX');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quartos`
--

DROP TABLE IF EXISTS `quartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quartos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(225) NOT NULL,
  `numero` varchar(225) NOT NULL,
  `qnt_cama_casal` int(11) NOT NULL,
  `qnt_cama_solteiro` int(11) NOT NULL,
  `preco` double(6,2) NOT NULL,
  `disponivel` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quartos`
--

LOCK TABLES `quartos` WRITE;
/*!40000 ALTER TABLE `quartos` DISABLE KEYS */;
INSERT INTO `quartos` VALUES (1,'Quarto Casal','120',1,0,9999.99,1),(2,'Quarto Teste','1',5,3,99.00,1),(3,'Quarto Solteiro','1',0,1,250.00,1),(5,'Quarto Supremo','1',500,0,5000.00,1),(6,'Quarto Supremo','1',500,0,5000.00,1),(7,'Quarto Supremo','1',500,0,5000.00,1),(9,'Quarto Royal','1000',2,0,555.55,1),(10,'Quarto Luxo','50',2,0,555.55,1),(12,'Quarto Teste WebSite','111',2,0,399.99,1),(13,'Quarto Teste WebSite2','222',5,0,333.00,1),(15,'Quarto Teste WebSite2','10',1,1,250.00,1);
/*!40000 ALTER TABLE `quartos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) NOT NULL,
  `quarto_id` int(11) NOT NULL,
  `adicional_id` int(11) DEFAULT NULL,
  `fim` datetime NOT NULL,
  `inicio` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `quarto_id` (`quarto_id`),
  KEY `adicional_id` (`adicional_id`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`quarto_id`) REFERENCES `quartos` (`id`),
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`adicional_id`) REFERENCES `adicionais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,3,2,2,'2025-09-02 14:19:12','2025-08-28 14:20:39'),(2,3,5,2,'2025-03-16 00:00:00','2025-03-14 00:00:00'),(3,4,2,2,'2025-09-30 19:45:17','2025-09-01 19:45:17'),(4,5,7,NULL,'2026-06-05 00:00:00','2026-06-01 00:00:00'),(9,152,5,NULL,'2024-07-05 12:00:00','2024-07-01 14:00:00'),(10,152,9,NULL,'2024-07-06 12:00:00','2024-07-02 14:00:00');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `senha` varchar(225) NOT NULL,
  `cargo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `cargo_id` (`cargo_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Keven','keven@gmail.com','01cfcd4f6b8770febfb40cb906715822',1),(2,'Kevin','kevin@gmail.com','123',1),(3,'Kevin','Kevin@outlook.com','$2y$10$DeuJZSid.V.rXGcU9jvZuunB6yQePRy75jiImutqNo0gICvJU763K',2),(4,'Kevin','KevinBraga@gmail.com','',2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26 16:26:10
