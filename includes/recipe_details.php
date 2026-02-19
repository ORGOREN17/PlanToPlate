<?php
require_once "db.php";

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("Invalid recipe");
}

$recipeId = (int)$_GET['id'];

/* --- Recipe --- */
$stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
$stmt->execute([$recipeId]);
$recipe = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$recipe) {
    die("Recipe not found");
}

/* --- Ingredients --- */
$stmt = $pdo->prepare("SELECT name FROM ingredients WHERE recipe_id = ?");
$stmt->execute([$recipeId]);
$ingredients = $stmt->fetchAll(PDO::FETCH_COLUMN);

/* --- Instructions --- */
$stmt = $pdo->prepare("
    SELECT step_number, description
    FROM instructions
    WHERE recipe_id = ?
    ORDER BY step_number
");
$stmt->execute([$recipeId]);
$instructions = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($recipe['title']) ?></title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header class="site-header">
  <a href="../index.html">
    <img src="../images/PlanToPlateLogo.png">
  </a>
  <nav class="nav">
    <a href="../index.html">Home</a>
    <a class="active" href="recipes.php">Recipes</a>
    <a href="../recipe-chat.html">Recipe Chat</a>
    <a href="../meal-plan.html">Meal Planner</a>
    <a href="favorites.php">Favorites</a>
    <a href="../tips.html">Tips</a>
  </nav>
</header>

<main class="page recipe-details">

    <h1><?= htmlspecialchars($recipe['title']) ?></h1>

    <img class="recipe-hero"
         src="../<?= htmlspecialchars($recipe['image_url']) ?>"
         alt="<?= htmlspecialchars($recipe['title']) ?>">

    <p class="recipe-desc"><?= htmlspecialchars($recipe['description']) ?></p>

    <div class="recipe-meta">
        <span>⏱ <?= $recipe['time'] ?> min</span>
        <span>⚙ <?= ucfirst($recipe['difficulty']) ?></span>
        <span>🍽 <?= ucfirst($recipe['category']) ?></span>
    </div>

    <div class="details-grid">

        <section>
            <h2>Ingredients</h2>
            <ul>
                <?php foreach ($ingredients as $ing): ?>
                    <li><?= htmlspecialchars($ing) ?></li>
                <?php endforeach; ?>
            </ul>
        </section>

        <section>
            <h2>Instructions</h2>
            <ol>
                <?php foreach ($instructions as $step): ?>
                    <li><?= htmlspecialchars($step['description']) ?></li>
                <?php endforeach; ?>
            </ol>
        </section>

    </div>

    <a class="btn secondary" href="recipes.php">← Back to Recipes</a>

</main>

<footer>
    From your fridge to your plate.
</footer>

</body>
</html>
