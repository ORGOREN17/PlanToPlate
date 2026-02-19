-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2026 at 04:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `name`) VALUES
(1, 1, 'Pasta'),
(2, 1, 'Mushrooms'),
(3, 1, 'Cream'),
(4, 3, 'Chicken breast'),
(5, 3, 'Lemon'),
(6, 6, 'Tomatoes'),
(7, 6, 'Cucumber'),
(8, 6, 'Feta cheese'),
(9, 6, 'Olives'),
(10, 7, 'Dark chocolate'),
(11, 7, 'Butter'),
(12, 7, 'Flour'),
(13, 7, 'Sugar'),
(14, 8, 'Bread'),
(15, 8, 'Avocado'),
(16, 8, 'Olive oil'),
(17, 9, 'Tomatoes'),
(18, 9, 'Onion'),
(19, 9, 'Garlic'),
(20, 2, 'Puff pastry'),
(21, 2, 'Milk'),
(22, 2, 'Vanilla pudding mix'),
(23, 4, 'Pasta'),
(24, 4, 'Cherry tomatoes'),
(25, 4, 'Feta cheese'),
(26, 5, 'Quinoa'),
(27, 5, 'Mixed vegetables'),
(28, 5, 'Olive oil');

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `recipe_id`, `step_number`, `description`) VALUES
(1, 1, 1, 'Boil pasta according to package instructions'),
(2, 1, 2, 'Cook mushrooms in a pan with butter'),
(3, 1, 3, 'Add cream and mix with pasta'),
(4, 3, 1, 'Season chicken with salt and pepper'),
(5, 3, 2, 'Cook chicken with lemon juice and herbs'),
(6, 6, 1, 'Chop vegetables and place in a bowl'),
(7, 6, 2, 'Add feta cheese and olives'),
(8, 6, 3, 'Season with olive oil and salt'),
(9, 7, 1, 'Melt chocolate and butter together'),
(10, 7, 2, 'Mix with sugar and flour'),
(11, 7, 3, 'Bake at 180°C for 45 minutes'),
(12, 8, 1, 'Toast the bread'),
(13, 8, 2, 'Mash avocado with spices'),
(14, 8, 3, 'Spread avocado on toast'),
(15, 9, 1, 'Cook tomatoes, onion, and garlic'),
(16, 9, 2, 'Blend until smooth'),
(17, 9, 3, 'Simmer and season'),
(18, 2, 1, 'Bake the puff pastry sheets until golden and crisp, then let them cool'),
(19, 2, 2, 'Cook the vanilla pudding with milk until thick and smooth'),
(20, 2, 3, 'Spread the cream between pastry layers, chill, then cut and serve'),
(21, 4, 1, 'Cook the pasta according to package instructions and let it cool'),
(22, 4, 2, 'Mix the pasta with cherry tomatoes and crumbled feta cheese'),
(23, 4, 3, 'Season to taste and serve chilled'),
(24, 5, 1, 'Cook the quinoa according to package instructions'),
(25, 5, 2, 'Sauté the mixed vegetables in olive oil until tender'),
(26, 5, 3, 'Combine the quinoa and vegetables in a bowl and serve warm');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `week_start` date NOT NULL,
  `meals_count` int(11) NOT NULL,
  `diet` varchar(30) NOT NULL,
  `notes` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`id`, `full_name`, `email`, `week_start`, `meals_count`, `diet`, `notes`, `created_at`) VALUES
(0, 'test', 'test@example.com', '2026-01-15', 10, 'none', 'No peanuts. Prefer meals under 30 minutes.', '2026-01-10 15:22:56'),
(0, 'tesy', 'test@gmail.com', '2026-09-09', 7, 'vegetarian', 'h', '2026-01-25 15:03:31'),
(0, 'lkkkijkiji', 'oday-nasrawi@hotmail.ocm', '2026-09-09', 3, 'none', '', '2026-01-30 16:30:46'),
(0, 'KUKU', 'kuku@gmail.com', '2027-03-01', 2, 'none', 'ghg', '2026-02-13 13:18:14'),
(0, 'Oday Nasrawi', 'oday@example.com', '2026-02-13', 10, 'none', 'No peanuts. Prefer meals under 30 minutes.', '2026-02-13 13:29:35'),
(0, 'tesy', 'test@gmail.com', '2027-03-04', 3, 'none', '', '2026-02-13 13:36:13'),
(0, 'tesy', 'test@gmail.com', '2027-01-02', 2, 'none', '', '2026-02-13 13:40:48'),
(0, 'tesy', 'test@gmail.com', '2027-03-02', 4, 'none', '', '2026-02-13 13:52:50'),
(0, 'tesy', 'test@gmail.com', '2027-03-03', 4, 'none', '', '2026-02-13 13:54:14');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `time` int(11) NOT NULL,
  `difficulty` varchar(50) NOT NULL,
  `image_url` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `category`, `time`, `difficulty`, `image_url`) VALUES
(1, 'Creamy Pasta', 'Pasta with mushrooms and cream sauce', 'main', 25, 'easy', 'images/creamyPasta.png'),
(2, 'Cremeschnitte Cake', 'Classic layered dessert with vanilla cream', 'dessert', 55, 'hard', 'images/Cremeschnitte_Cake.png'),
(3, 'Lemon Garlic Chicken', 'Juicy chicken with lemon and herbs', 'main', 30, 'medium', 'images/Lemon_Garlic_Chicken.png'),
(4, 'Pasta Salad', 'Fresh pasta salad with vegetables and feta', 'salad', 18, 'easy', 'images/Pasta_Salad.png'),
(5, 'Vegan Bowl', 'Healthy bowl with quinoa and vegetables', 'main', 20, 'easy', 'images/vegan_bowl.png'),
(6, 'Greek Salad', 'Classic Greek salad with feta, olives, and fresh vegetables', 'salad', 15, 'easy', 'images/greek_salad.png'),
(7, 'Chocolate Brownies', 'Rich chocolate brownies with a fudgy center', 'dessert', 45, 'medium', 'images/chocolate_brownies.png'),
(8, 'Avocado Toast', 'Toasted bread topped with smashed avocado and spices', 'main', 10, 'easy', 'images/avocado_toast.png'),
(9, 'Tomato Soup', 'Warm homemade tomato soup with herbs', 'main', 35, 'easy', 'images/tomato_soup.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_recipe` (`user_id`,`recipe_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
