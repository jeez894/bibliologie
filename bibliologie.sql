-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 mars 2024 à 14:56
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliologie`
--

-- --------------------------------------------------------

--
-- Structure de la table `bibliothequeglobale`
--

DROP TABLE IF EXISTS `bibliothequeglobale`;
CREATE TABLE IF NOT EXISTS `bibliothequeglobale` (
  `libraryID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `classID` int DEFAULT NULL,
  `itemID` int DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`libraryID`),
  KEY `userID` (`userID`),
  KEY `classID` (`classID`),
  KEY `itemID` (`itemID`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bibliothequeglobale`
--

INSERT INTO `bibliothequeglobale` (`libraryID`, `userID`, `classID`, `itemID`, `status`) VALUES
(1, 1, 1, 1, 'Statut de l\'item'),
(60, 78, 3, 38, 'lu et souhaité'),
(58, 78, 4, 36, 'lu et souhaité'),
(57, 78, 4, 35, 'a lire et souhaité'),
(55, 78, 4, 33, 'lu et souhaité'),
(56, 78, 4, 34, 'lu et souhaité'),
(62, 79, 10, 40, 'lu et souhaité'),
(63, 78, 3, 41, 'a lire et souhaité'),
(64, 78, 3, 42, 'a lire et souhaité'),
(65, 78, 3, 43, 'a lire et souhaité');

-- --------------------------------------------------------

--
-- Structure de la table `categoriesutilisateur`
--

DROP TABLE IF EXISTS `categoriesutilisateur`;
CREATE TABLE IF NOT EXISTS `categoriesutilisateur` (
  `classID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date_of_creation` date DEFAULT NULL,
  PRIMARY KEY (`classID`),
  KEY `userID` (`userID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categoriesutilisateur`
--

INSERT INTO `categoriesutilisateur` (`classID`, `userID`, `name`, `date_of_creation`) VALUES
(1, 1, 'Nom de la catégorie', '2000-01-01'),
(3, 78, 'test1', '2024-02-06'),
(4, 78, 'test2', '2024-02-06'),
(10, 79, 'test', '2024-03-04'),
(11, 79, 'tesst2', '2024-03-04');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name_surname` varchar(255) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `userID` (`userID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`orderID`, `userID`, `delivery_address`, `order_status`, `phone`, `email`, `name_surname`, `order_date`, `order_price`) VALUES
(1, 1, 'Adresse de livraison', 'Statut de la commande', '0123456789', 'email@commande.com', 'Nom Prénom', '2000-01-01', 29.99),
(2, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(3, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(4, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(5, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(6, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(7, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(8, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.00),
(9, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 0.66),
(10, 78, '31 rue lazare carnot, Grenoble, 38000, Fr', 'Payé', 'test', 'pow666@hotmail.fr', 'guillaume Rouge', '2024-02-23', 48.45);

-- --------------------------------------------------------

--
-- Structure de la table `detailscommande`
--

DROP TABLE IF EXISTS `detailscommande`;
CREATE TABLE IF NOT EXISTS `detailscommande` (
  `order_DetailID` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_DetailID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `detailscommande`
--

INSERT INTO `detailscommande` (`order_DetailID`, `orderID`, `productID`, `quantity`, `unitPrice`, `total`) VALUES
(1, 1, 1, 2, 9.99, 19.98),
(2, 8, 21, 5, 5.99, 29.95),
(3, 8, 12, 3, 11.99, 35.97),
(4, 9, 21, 5, 5.99, 29.95),
(5, 9, 12, 3, 11.99, 35.97),
(6, 10, 21, 2, 5.99, 11.98),
(7, 10, 12, 1, 11.99, 11.99),
(8, 10, 16, 1, 10.49, 10.49),
(9, 10, 17, 1, 8.99, 8.99);

-- --------------------------------------------------------

--
-- Structure de la table `oeuvres`
--

DROP TABLE IF EXISTS `oeuvres`;
CREATE TABLE IF NOT EXISTS `oeuvres` (
  `itemID` int NOT NULL AUTO_INCREMENT,
  `volumeID` bigint NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'non trouvée',
  `apiURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `oeuvres`
--

INSERT INTO `oeuvres` (`itemID`, `volumeID`, `title`, `description`, `apiURL`) VALUES
(1, 0, 'Titre de l\'oeuvre', 'Auteur de l\'oeuvre', 'http://api-url'),
(35, 996072, 'Dandadan', '<p><em>Déterminés à s’emparer du précieux attribut d’Okarun, les Serpos frappent à nouveau ! Cette fois-ci, ils surgissent au lycée et emprisonnent le jeune homme dans une dimension parallèle ! Heureusement, il est secouru par Aira en qui s’est éveillé le', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8987779-4391552540-Danda.jpg'),
(36, 996073, 'Dandadan', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8987781-4580144051-Danda.jpg'),
(37, 1011350, 'Dandadan', '<p><em>Bien que Seiko soit parvenue à emprisonner l\'Œil maléfique dans Tarô, le mannequin d\'anatomie, la terrible entité occupe toujours le corps de Jiji. Et comme si ça ne suffisait pas, ils s\'aperçoivent qu\'au moindre contact avec l\'eau froide, le jeune', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/9078941-5100852621-Danda.jpg'),
(38, 1033488, 'Dandadan', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/9190923-0996713349-Dandad.jpeg'),
(39, 1033489, 'Dandadan', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/9190924-3247246813-Danda.jpg'),
(34, 996045, 'Dandadan', '<p><em>Déterminés à s’emparer du précieux attribut d’Okarun, les Serpos frappent à nouveau ! Cette fois-ci, ils surgissent au lycée et emprisonnent le jeune homme dans une dimension parallèle ! Heureusement, il est secouru par Aira en qui s’est éveillé le', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8987778-0717995804-Danda.jpg'),
(31, 951606, 'Dandadan', '<p><em>Momo Ayase et Ken Takakura sont tous deux lycéens. Tandis que la première croit aux fantômes, le second est fasciné par les extraterrestres. Évidemment, chacun se moque des croyances de l’autre. Momo se retrouve dans un hôpital où des créatures de ', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8689248-3576454516-danda.jpg'),
(32, 951607, 'Dandadan', '<p><em>Okarun, le nerd de service, et la pétillante Momo forment désormais un improbable duo ! Leur objectif est clair : dégommer Mémé-Turbo, l\'esprit à l\'origine de la malédiction qui a frappé Ken. Sur le papier, leur plan était simple, il suffisait de l', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8689251-0648799844-danda.jpg'),
(33, 996044, 'Dandadan', '<p><em>La belle et populaire élève du lycée, Aira, a ramassé l’une des “boules“ d’Okarun, sans savoir de quoi il s’agissait. Depuis, elle est devenue capable de percevoir les phénomènes paranormaux et se croit investie d’une mission sacrée. Elle tend un p', 'https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/8987777-6457817663-Danda.jpg'),
(40, 560266, 'Naruto', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5553075-01.jpg'),
(41, 560333, 'Naruto', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5553194-08.jpg'),
(42, 560334, 'Naruto', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5553195-09.jpg'),
(43, 560332, 'Naruto', NULL, 'https://comicvine.gamespot.com/a/uploads/scale_small/6/67663/5553192-07.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `info` text,
  `product_reference` varchar(255) DEFAULT NULL,
  `supplier_reference` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `titre` varchar(255) NOT NULL DEFAULT 'non definit',
  `sous_titre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `resume` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'non definit',
  `auteur` varchar(255) NOT NULL DEFAULT 'non definit',
  `tags` varchar(255) NOT NULL DEFAULT 'non definit',
  `nombre_de_pages` int NOT NULL,
  `parution` date NOT NULL,
  PRIMARY KEY (`productID`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`productID`, `description`, `info`, `product_reference`, `supplier_reference`, `stock`, `price`, `image`, `titre`, `sous_titre`, `resume`, `auteur`, `tags`, `nombre_de_pages`, `parution`) VALUES
(6, 'L\'Odyssée du Ciel', 'Premier voyage', 'SKY-001', 'SUP-001', 100, 9.99, 'https://imgur.com/dOMiBlm', 'L\'Odyssée du Ciel', 'Le Réveil des Étoiles', 'Dans un monde où le ciel est infini, un jeune navigateur rêve d\'explorer l\'univers.', 'Alex Durand', 'Aventure;Science-Fiction', 256, '2024-01-15'),
(7, 'Gardiens des Abysses', 'Tome 1', 'ABYSSES-001', 'SUP-002', 120, 10.99, 'https://imgur.com/Qmaf5ck', 'Gardiens des Abysses', 'Les Secrets Engloutis', 'Sous les vagues, une civilisation oubliée garde un secret millénaire.', 'Marie Lefevre', 'Fantaisie;Mystère', 198, '2024-03-22'),
(3, 'Le Chant des Dragons', 'L\'Éveil', 'DRAGON-001', 'SUP-003', 80, 11.99, 'https://imgur.com/2WZkCB8', 'Le Chant des Dragons', 'La Flamme Intérieure', 'Quand les dragons se réveillent, le monde doit trouver son nouveau gardien.', 'Jean-Pierre Martin', 'Fantasy;Aventure', 310, '2024-05-18'),
(4, 'Chroniques de Lumière', 'Prologue', 'LUMIERE-001', 'SUP-004', 95, 12.99, 'https://imgur.com/NdJ2k4z', 'Chroniques de Lumière', 'L\'Aube des Héros', 'Dans une époque de ténèbres, la lumière cherche ses champions.', 'Sophie Dubois', 'Fantaisie;Héroïque', 289, '2024-07-21'),
(5, 'Voyageurs des Brumes', 'Origines', 'BRUMES-001', 'SUP-005', 110, 8.99, 'https://imgur.com/mhuV3wy', 'Voyageurs des Brumes', 'Les Sentiers Cachés', 'Entre les brumes, des passages vers des mondes oubliés s\'ouvrent pour les braves.', 'Lucas Dupont', 'Science-Fiction;Exploration', 234, '2024-09-12'),
(8, 'Les Chemins de l\'École', 'Rentrée des classes', 'ECOLE-008', 'SUP-006', 90, 7.99, 'https://imgur.com/eOCY8qd', 'Les Chemins de l\'École', 'Nouveaux Départs', 'L\'aventure quotidienne et extraordinaire de jeunes écoliers.', 'Clara Moreau', 'Tranche de vie;École', 120, '2024-09-01'),
(9, 'Journal d\'un Lycéen', 'Premier Semestre', 'LYCEEN-009', 'SUP-007', 85, 8.99, 'https://imgur.com/gGagQ5A', 'Journal d\'un Lycéen', 'Débuts et Découvertes', 'Le quotidien d\'un lycéen entre amitié, amour et études.', 'Maxime Dupuis', 'Tranche de vie;Adolescence', 180, '2024-10-05'),
(10, 'Campus en Folie', 'Introduction à la vie universitaire', 'CAMPUS-010', 'SUP-008', 75, 9.49, 'https://imgur.com/0rljSnu', 'Campus en Folie', 'Premiers Pas', 'La vie sur un campus universitaire, entre liberté et responsabilités.', 'Julie Fontaine', 'Comédie;Université', 150, '2024-11-10'),
(11, 'Ma Vie de Prof', 'L\'année du changement', 'PROF-011', 'SUP-009', 80, 10.99, 'https://imgur.com/mjnGyyJ', 'Ma Vie de Prof', 'Nouveaux Challenges', 'Les défis et satisfactions de la vie d\'un enseignant.', 'Éric Martin', 'Tranche de vie;Éducation', 200, '2024-12-15'),
(12, 'Rêves d\'Artiste', 'Les premiers pinceaux', 'ARTISTE-012', 'SUP-010', 100, 11.99, 'https://imgur.com/34CX1Sa', 'Rêves d\'Artiste', 'Chercher sa Voie', 'Le parcours d\'une jeune artiste en quête de son identité créative.', 'Anne Lise Girard', 'Biographie;Art', 220, '2025-01-20'),
(13, 'Au Cœur de l\'Onsen', 'Détente et traditions', 'ONSEN-013', 'SUP-011', 95, 8.49, 'https://imgur.com/B4clwSI', 'Au Cœur de l\'Onsen', 'Voyage Thermal', 'Un voyage immersif au sein des plus beaux onsens du Japon.', 'Hiro Takahashi', 'Culture;Détente', 160, '2025-02-10'),
(14, 'Les Secrets du Café', 'L\'art de la torréfaction', 'CAFE-014', 'SUP-012', 88, 9.99, 'https://imgur.com/2VpTrF7', 'Les Secrets du Café', 'Entre Grains et Arômes', 'Explorez les arcanes de la préparation du café, de la graine à la tasse.', 'Sophie Bernard', 'Gastronomie;Documentaire', 180, '2025-03-15'),
(15, 'Évasion Onsen', 'Les saisons des bains', 'ONSEN-015', 'SUP-013', 80, 7.99, 'https://imgur.com/cmQ3xcb', 'Évasion Onsen', 'Harmonie avec la Nature', 'Découverte des onsens à travers les quatre saisons, un havre de paix.', 'Yuki Kuroda', 'Voyage;Bien-être', 144, '2025-04-20'),
(16, 'Café du Monde', 'Voyages en tasse', 'CAFEMONDE-016', 'SUP-014', 92, 10.49, 'https://imgur.com/7hV5OP5', 'Café du Monde', 'Découvertes Globales', 'Un tour du monde en 80 cafés, de l\'Amérique latine à l\'Asie.', 'Alexandre Dupont', 'Aventure;Gastronomie', 210, '2025-05-25'),
(17, 'Onsen Spirituel', 'Bains et méditation', 'ONSENSPIRIT-017', 'SUP-015', 85, 8.99, 'https://imgur.com/duDxzPl', 'Onsen Spirituel', 'Quête de Sérénité', 'Les onsens comme lieu de méditation et de quête spirituelle.', 'Emi Suzuki', 'Spiritualité;Détente', 128, '2025-06-30'),
(18, 'Pique-Nique sous les Étoiles', 'Soirée d\'été', 'PICNIC-018', 'SUP-016', 100, 6.99, 'https://imgur.com/AFqFsNv', 'Pique-Nique sous les Étoiles', 'Magie Nocturne', 'Une collection de récits autour de pique-niques nocturnes féeriques.', 'Léa Dubois', 'Nature;Aventure', 140, '2025-07-05'),
(19, 'Oasis Urbaine', 'L\'été en ville', 'PISCINE-019', 'SUP-017', 90, 7.49, 'https://imgur.com/gioxsQD', 'Oasis Urbaine', 'Fraîcheur Citadine', 'Découvrez les meilleures piscines urbaines pour un été rafraîchissant.', 'Marc Petit', 'Voyage;Détente', 152, '2025-08-10'),
(20, 'Aventures au Parc Aquatique', 'Glissades et frissons', 'AQUAPARK-020', 'SUP-018', 85, 8.99, 'https://imgur.com/C0ZVk3C', 'Aventures au Parc Aquatique', 'Sensations Aquatiques', 'Plongez dans l\'univers excitant des parcs aquatiques.', 'Julie Martin', 'Aventure;Famille', 165, '2025-09-15'),
(21, 'Les Secrets du Pique-Nique Parfait', 'Art et tradition', 'PICNICPERF-021', 'SUP-019', 95, 5.99, 'https://imgur.com/rFosg28', 'Les Secrets du Pique-Nique Parfait', 'Convivialité et Gourmandise', 'Tout savoir pour organiser le pique-nique idéal.', 'Anne Leroy', 'Gastronomie;Guide', 120, '2025-10-20');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'utilisateur',
  `date_of_birth` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `adult` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`userID`, `email`, `status`, `date_of_birth`, `password`, `adult`) VALUES
(78, 'chier@chier', 'utilisateur', '1990-10-03', '$2b$10$qnQJ.kZk7YYBdzglX4qUH.Q6WSe6ot49Tb23ZSic1rTPlwOSLhxBi', 1),
(77, 'test@jojo', 'utilisateur', '0000-00-00', '$2b$10$LXeHsL8lhUNYncyNwLcUZujWeNvqvPr3DQcK2YAFtuC3uphhhAL32', 0),
(79, 'p@p', 'admin', '1990-10-03', '$2b$10$GiciRfDnFaeDhY/rnnxg/upgl6nn4btW4rVWNWS6dIyVlap.VsgWq', 1),
(80, 'utilisateur1@example.com', 'actif', '1990-01-01', 'motdepasse1', 1),
(81, 'utilisateur2@example.com', 'inactif', '1985-05-10', 'motdepasse2', 1),
(82, 'utilisateur3@example.com', 'actif', '1988-12-15', 'motdepasse3', 0),
(84, 'utilisateur5@example.com', 'inactif', '2000-03-25', 'motdepasse5', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
