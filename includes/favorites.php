<?php
require_once "db.php";

/* single user */
$userId = 1;

/* fetch favorites */
$stmt = $pdo->prepare("
  SELECT r.id, r.title, r.description, r.image_url
  FROM favorites f
  JOIN recipes r ON r.id = f.recipe_id
  WHERE f.user_id = ?
");
$stmt->execute([$userId]);
$favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PlanToPlate – Favorites</title>
  <link rel="stylesheet" href="../css/style.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script defer src="../js/favorites.js"></script>
</head>

<body>

<header class="site-header">
  <a href="../index.html">
    <img src="../images/PlanToPlateLogo.png" alt="PlanToPlate">
  </a>
  <nav class="nav">
    <a href="../index.html">Home</a>
    <a href="recipes.php">Recipes</a>
    <a href="recipe-chat.html">Recipe Chat</a>
    <a href="meal-plan.html">Meal Planner</a>
    <a class="active" href="favorites.php">Favorites</a>
    <a href="tips.html">Tips</a>
  </nav>
</header>

<main class="page">
  <h1>Favorites</h1>

  <?php if (empty($favorites)): ?>
    <p class="empty-msg"></p>
  <?php endif; ?>

  <section class="recipe-grid" id="favoritesGrid">
    <?php foreach ($favorites as $r): ?>
      <div class="recipe-card" data-id="<?= $r['id'] ?>">
        <img src="../<?= htmlspecialchars($r['image_url']) ?>" alt="">
        <h3><?= htmlspecialchars($r['title']) ?></h3>
        <p><?= htmlspecialchars($r['description']) ?></p>

        <div class="card-actions">
          <a class="btn small" href="recipe_details.php?id=<?= $r['id'] ?>">View</a>
          <button class="btn danger remove-fav">Remove</button>
        </div>
      </div>
    <?php endforeach; ?>
  </section>
</main>

<footer>
  From your fridge to your plate.
</footer>

</body>
</html>