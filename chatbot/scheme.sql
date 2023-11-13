-- MariaDB dump 10.19  Distrib 10.6.15-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: climatewavers_db
-- ------------------------------------------------------
-- Server version	10.6.15-MariaDB-1:10.6.15+maria~ubu2004

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add custom user',1,'add_customuser'),(2,'Can change custom user',1,'change_customuser'),(3,'Can delete custom user',1,'delete_customuser'),(4,'Can view custom user',1,'view_customuser'),(5,'Can add post',2,'add_post'),(6,'Can change post',2,'change_post'),(7,'Can delete post',2,'delete_post'),(8,'Can view post',2,'view_post'),(9,'Can add follower',3,'add_follower'),(10,'Can change follower',3,'change_follower'),(11,'Can delete follower',3,'delete_follower'),(12,'Can view follower',3,'view_follower'),(13,'Can add comment',4,'add_comment'),(14,'Can change comment',4,'change_comment'),(15,'Can delete comment',4,'delete_comment'),(16,'Can view comment',4,'view_comment'),(17,'Can add log entry',5,'add_logentry'),(18,'Can change log entry',5,'change_logentry'),(19,'Can delete log entry',5,'delete_logentry'),(20,'Can view log entry',5,'view_logentry'),(21,'Can add permission',6,'add_permission'),(22,'Can change permission',6,'change_permission'),(23,'Can delete permission',6,'delete_permission'),(24,'Can view permission',6,'view_permission'),(25,'Can add group',7,'add_group'),(26,'Can change group',7,'change_group'),(27,'Can delete group',7,'delete_group'),(28,'Can view group',7,'view_group'),(29,'Can add content type',8,'add_contenttype'),(30,'Can change content type',8,'change_contenttype'),(31,'Can delete content type',8,'delete_contenttype'),(32,'Can view content type',8,'view_contenttype'),(33,'Can add session',9,'add_session'),(34,'Can change session',9,'change_session'),(35,'Can delete session',9,'delete_session'),(36,'Can view session',9,'view_session'),(37,'Can add Token',10,'add_token'),(38,'Can change Token',10,'change_token'),(39,'Can delete Token',10,'delete_token'),(40,'Can view Token',10,'view_token'),(41,'Can add token',11,'add_tokenproxy'),(42,'Can change token',11,'change_tokenproxy'),(43,'Can delete token',11,'delete_tokenproxy'),(44,'Can view token',11,'view_tokenproxy');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('1a12d7cb44a25e391526d2824ee2e910c94dc7b4','2023-10-23 17:24:16.620142',19),('24294e316f3f2d61abe1e764bba93d12495c5a13','2023-10-23 17:24:05.250948',1);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment_content` longtext NOT NULL,
  `comment_time` datetime(6) NOT NULL,
  `commenter_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_commenter_id_469bccba_fk` (`commenter_id`),
  KEY `comment_post_id_d299ca5f_fk` (`post_id`),
  CONSTRAINT `comment_commenter_id_469bccba_fk` FOREIGN KEY (`commenter_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_post_id_d299ca5f_fk` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-10-22 10:58:05.659209','2','testuser',3,'',1,1),(2,'2023-10-22 11:47:47.317226','4','testuser',3,'',1,1),(3,'2023-10-22 12:19:30.293154','6','testuser',3,'',1,1),(4,'2023-10-22 13:26:21.629437','8','testuser',3,'',1,1),(5,'2023-10-22 13:46:24.914519','10','testuser',3,'',1,1),(6,'2023-10-22 13:48:18.773690','12','testuser',3,'',1,1),(7,'2023-10-22 14:20:13.649522','13','7b5f5042828af428d003eeeb2004c853c861ead7',1,'[{\"added\": {}}]',11,1),(8,'2023-10-22 14:38:57.618460','13','7b5f5042828af428d003eeeb2004c853c861ead7',3,'',11,1),(9,'2023-10-22 14:39:12.365895','13','testuser',3,'',1,1),(10,'2023-10-22 14:43:25.804149','14','testuser',3,'',1,1),(11,'2023-10-22 20:12:08.422785','16','testuser',3,'',1,1),(12,'2023-10-23 06:40:44.455980','1','cd16553494b8c36f29b6336efd94c7105fd5f834',1,'[{\"added\": {}}]',11,1),(13,'2023-10-23 06:52:00.408573','17','54edcdc8d815f45bea7ea5b7025ce70c3c4b9ac6',1,'[{\"added\": {}}]',11,1),(14,'2023-10-23 07:30:56.099083','17','54edcdc8d815f45bea7ea5b7025ce70c3c4b9ac6',3,'',11,1),(15,'2023-10-23 07:31:17.389967','1','cd16553494b8c36f29b6336efd94c7105fd5f834',3,'',11,1),(16,'2023-10-23 07:31:53.606056','17','testuser',3,'',1,1),(17,'2023-10-23 07:49:19.521538','18','testuser',3,'',1,1),(18,'2023-10-23 17:24:05.259346','1','24294e316f3f2d61abe1e764bba93d12495c5a13',1,'[{\"added\": {}}]',11,1),(19,'2023-10-23 17:24:16.628277','19','1a12d7cb44a25e391526d2824ee2e910c94dc7b4',1,'[{\"added\": {}}]',11,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (5,'admin','logentry'),(7,'auth','group'),(6,'auth','permission'),(10,'authtoken','token'),(11,'authtoken','tokenproxy'),(4,'climate_wavers','comment'),(1,'climate_wavers','customuser'),(3,'climate_wavers','follower'),(2,'climate_wavers','post'),(8,'contenttypes','contenttype'),(9,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-10-22 05:35:30.263145'),(2,'contenttypes','0002_remove_content_type_name','2023-10-22 05:35:30.405252'),(3,'auth','0001_initial','2023-10-22 05:35:30.694920'),(4,'auth','0002_alter_permission_name_max_length','2023-10-22 05:35:30.753568'),(5,'auth','0003_alter_user_email_max_length','2023-10-22 05:35:30.762417'),(6,'auth','0004_alter_user_username_opts','2023-10-22 05:35:30.773952'),(7,'auth','0005_alter_user_last_login_null','2023-10-22 05:35:30.782916'),(8,'auth','0006_require_contenttypes_0002','2023-10-22 05:35:30.789139'),(9,'auth','0007_alter_validators_add_error_messages','2023-10-22 05:35:30.796582'),(10,'auth','0008_alter_user_username_max_length','2023-10-22 05:35:30.808564'),(11,'auth','0009_alter_user_last_name_max_length','2023-10-22 05:35:30.819665'),(12,'auth','0010_alter_group_name_max_length','2023-10-22 05:35:30.859320'),(13,'auth','0011_update_proxy_permissions','2023-10-22 05:35:30.867757'),(14,'auth','0012_alter_user_first_name_max_length','2023-10-22 05:35:30.880493'),(15,'climate_wavers','0001_initial','2023-10-22 05:35:31.962085'),(16,'admin','0001_initial','2023-10-22 05:35:32.106008'),(17,'admin','0002_logentry_remove_auto_add','2023-10-22 05:35:32.123802'),(18,'admin','0003_logentry_add_action_flag_choices','2023-10-22 05:35:32.144682'),(19,'authtoken','0001_initial','2023-10-22 05:35:32.248142'),(20,'authtoken','0002_auto_20160226_1747','2023-10-22 05:35:32.312245'),(21,'authtoken','0003_tokenproxy','2023-10-22 05:35:32.317213'),(22,'sessions','0001_initial','2023-10-22 05:35:32.381897'),(23,'climate_wavers','0002_auto_20231024_1211','2023-10-24 16:17:51.046494');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('bun6xc6aqhyy0rv5tsk8v41yc065r9yr','.eJxVjDsOwjAQBe_iGlmx8W8p6XMGa3dt4wBypDipEHeHSCmgfTPzXiLitta49bzEKYmLUCBOvyMhP3LbSbpju82S57YuE8ldkQftcpxTfl4P9--gYq_f2vpgNAAUBOYyQAJ0OYSCZvCanHdFsVbWnD2B9uiIyLsEig2rosmK9wcBmjf4:1qvKLu:43Q4V1dg7ki8wQ56aZtCTv3O9AQk2NKJfo3W8hObbtM','2023-11-07 16:33:58.271318');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower`
--

DROP TABLE IF EXISTS `follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follower` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `follower_user_id_1f94deca_fk` (`user_id`),
  CONSTRAINT `follower_user_id_1f94deca_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower`
--

LOCK TABLES `follower` WRITE;
/*!40000 ALTER TABLE `follower` DISABLE KEYS */;
/*!40000 ALTER TABLE `follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follower_followers`
--

DROP TABLE IF EXISTS `follower_followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follower_followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `follower_followers_follower_id_customuser_id_ca0013c7_uniq` (`follower_id`,`customuser_id`),
  KEY `follower_followers_customuser_id_85a36e86_fk_user_id` (`customuser_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follower_followers`
--

LOCK TABLES `follower_followers` WRITE;
/*!40000 ALTER TABLE `follower_followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `follower_followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) NOT NULL,
  `content_text` longtext DEFAULT NULL,
  `content_image` varchar(100) DEFAULT NULL,
  `comment_count` int(10) unsigned NOT NULL,
  `creater_id` bigint(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_creater_id_a620b9df_fk` (`creater_id`),
  CONSTRAINT `post_creater_id_a620b9df_fk` FOREIGN KEY (`creater_id`) REFERENCES `user` (`id`),
  CONSTRAINT `post_comment_count_920f3410_check` CHECK (`comment_count` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_likers`
--

DROP TABLE IF EXISTS `post_likers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_likers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_likers_post_id_customuser_id_19a020ed_uniq` (`post_id`,`customuser_id`),
  KEY `post_likers_customuser_id_56b26692_fk_user_id` (`customuser_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likers`
--

LOCK TABLES `post_likers` WRITE;
/*!40000 ALTER TABLE `post_likers` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_likers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_savers`
--

DROP TABLE IF EXISTS `post_savers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_savers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_savers_post_id_customuser_id_aefe8a0d_uniq` (`post_id`,`customuser_id`),
  KEY `post_savers_customuser_id_61bfee18_fk_user_id` (`customuser_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_savers`
--

LOCK TABLES `post_savers` WRITE;
/*!40000 ALTER TABLE `post_savers` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_savers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `username` varchar(150) DEFAULT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  `bio` longtext DEFAULT NULL,
  `cover` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `is_superuser` tinyint(1) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `last_location` varchar(255) DEFAULT NULL,
  `is_google_user` tinyint(1) DEFAULT NULL,
  `is_redhat_user` tinyint(1) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `is_twitter_user` tinyint(1) DEFAULT NULL,
  `is_facebook_user` tinyint(1) DEFAULT NULL,
  `is_staff` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `date_joined` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-10-24 16:28:40.941870','','','ismael','',NULL,'','pbkdf2_sha256$260000$Fc6xD8KEsrhjrUASpG3vvH$g6D9DhgNr4GvO/wPFVXLNNR00GS80Ack9Ige3sZHq54=','kipropismael27@gmail.com',1,NULL,NULL,NULL,0,0,0,0,0,1,1,'2023-10-22 05:40:54.818635'),(19,'2023-10-24 16:33:57.468178','','','testuser','','This is a test user.','','pbkdf2_sha256$260000$E0pY9GO4XIOa5UnOjieDP5$CCAKVJWMLZqjyT2xbxdk+6hoYozGw8+yW7d/LmsTCoU=','kipropismael96@gmail.com',0,'Software Developer','1234567890','New York',0,0,0,0,0,0,1,'2023-10-23 07:50:08.084533');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_groups_customuser_id_group_id_69b568ae_uniq` (`customuser_id`,`group_id`),
  KEY `user_groups_group_id_b76f8aba_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_groups_group_id_b76f8aba_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_permissions_customuser_id_permission_id_2f47aad7_uniq` (`customuser_id`,`permission_id`),
  KEY `user_user_permission_permission_id_9deb68a3_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_permission_permission_id_9deb68a3_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_permissions`
--

LOCK TABLES `user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24 20:03:48
