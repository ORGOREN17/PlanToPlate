<?php
require_once "db.php";

$userId = 1;
$recipeId = $_POST['recipe_id'] ?? null;

if (!$recipeId) {
  echo json_encode(["success" => false]);
  exit;
}

$stmt = $pdo->prepare("
  DELETE FROM favorites
  WHERE user_id = ? AND recipe_id = ?
");
$stmt->execute([$userId, $recipeId]);

echo json_encode(["success" => true]);
