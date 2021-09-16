DROP DATABASE IF EXISTS NewFuTure;
CREATE DATABASE NewFuTure;
USE NewFuTure;


-- Tabla de Productos
DROP TABLE IF EXISTS `nfts`;
CREATE TABLE `nfts` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(200) DEFAULT NULL,
  `price` float(5) NOT NULL,
  `pieceName` varchar(100) NOT NULL,
  `description` varchar(350) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=innoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `nfts` (`image`, `price`, `pieceName`, `description`)VALUES ("nft-example-1.jpg", 0.0654, "Piece Name", "Test Description" ), ("nft-example-2.jpg", 0.6054, "Piece Name 2", "Test Description 2"), ("nft-example-3.jpg", 0.30654, "Piece Name 3", "Test Description 3"), ("nft-example-4.jpg", 0.40654, "Piece Name 4", "Test Description 4" ), ("nft-example-5.png", 0.0554, "Piece Name 5", "Test Description 5" ), ("nft-example-6.jpg", 0.06564, "Piece Name 6", "Test Description 6" ), ("nft-example-7.png", 0.70654, "Piece Name 7", "Test Description 7" ), ("nft-example-8.jpg", 0.0654, "Piece Name 8", "Test Description 8" ), ("nft-example-9.png", 0.90654, "Piece Name 9", "Test Description 9" ), ("nft-example-11.jpg", 0.054, "Piece Name 11", "Test Description 11" ), ("create_image-1627343562347.gif", 0.0654, "Piece Name 12", "Test Description 12"), ("nft-example-12.jpg", 0.0654, "Piece Name 13", "Test Description 13" ) ,("create_image-1629767046818.gif", 0.0654, "Piece Name 14", "Test Description 14" ), ("create_image-1629767118322.jpg", 0.0654, "Piece Name 15", "Test Description 15" );



-- Tabla de usuarios 
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100)  COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(350) NULL DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=innoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`name`,`email`,`username`,`password`, `description`, `profile_pic`) VALUES ("firstName lastName", "author@email.com", "Test Username", "$2b$10$OwR11K7I6uZSJBau5Ndrxe22hPQqLVZVSI1Ox3hqru3UE3avOxPwS","", "user2.jpg"), ("firstName 2 lastName 2", "author2@email.com", "Test Username2", "$2b$10$pJccLp2nRTsEph6XfVTynuvMEZnqSf7CYDFOS7Yu7TbXkSLZew2kK","", "create_image-1629822576560.jpg");

-- Tabla colecciones. Esta es una tabla intermedia que relaciona a X cantidad de nfts que pertencen (en ownership) a un usuario.

DROP TABLE IF EXISTS `nft_colections`;
CREATE TABLE `nft_colections` (
  `id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  `ownerId` mediumint(6) unsigned NOT NULL,
  `productId` mediumint(6) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chupame_los_2_huevos` (`ownerId`),
  KEY `chupame_los_3_huevos` (`productId`),
  CONSTRAINT `owner_colection_idfk` FOREIGN KEY (`ownerId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE ,
  CONSTRAINT `product_colection_idfk` FOREIGN KEY (`productId`) REFERENCES `nfts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=innoDB DEFAULT CHARSET=utf8mb4;

-- TODO add property actualOwner BOOLEAN NOT NULL

DROP TABLE IF EXISTS `nft_favorites`;
CREATE TABLE `nft_favorites` (
  	`id` mediumint(6) unsigned NOT NULL AUTO_INCREMENT,
  	`userId` mediumint(6) unsigned NOT NULL,
  	`productId` mediumint(6) unsigned NOT NULL,
  	PRIMARY KEY (`id`),
  	KEY `chupame_los_4_huevos` (`userId`),
  	KEY `chupame_los_5_huevos` (`productId`),
  	CONSTRAINT `user_favorite_idfk` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE,
  	CONSTRAINT `porduct_favorite_idfk` FOREIGN KEY (`productId`) REFERENCES `nfts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=innoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `nft_favorites` (`userId`, `productId`) VALUES (1,8),(1,9),(1,10);
INSERT INTO `nft_colections` (`ownerId`, `productId`) VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(2,8),(2,9),(2,10),(2,11),(2,12),(2,13),(2,14);

