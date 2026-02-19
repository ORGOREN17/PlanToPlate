<?php
require_once "db.php";
header("Content-Type: application/json");

$recipeId = $_GET['id'] ?? null;
if (!$recipeId) {
  echo json_encode(["error" => "Missing recipe id"]);
  exit;
}

/* Recipe */
$stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
$stmt->execute([$recipeId]);
$recipe = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$recipe) {
  echo json_encode(["error" => "Recipe not found"]);
  exit;
}

/* Ingredients */
$stmt = $pdo->prepare(
  "SELECT name FROM ingredients WHERE recipe_id = ?"
);
$stmt->execute([$recipeId]);
$ingredients = $stmt->fetchAll(PDO::FETCH_COLUMN);

/* Instructions */
$stmt = $pdo->prepare(
  "SELECT step_number, description
   FROM instructions
   WHERE recipe_id = ?
   ORDER BY step_number"
);
$stmt->execute([$recipeId]);
$instructions = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
  "recipe" => $recipe,
  "ingredients" => $ingredients,
  "instructions" => $instructions
]);
