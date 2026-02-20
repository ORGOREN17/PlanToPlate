<?php
require_once "db.php";

$recipeId = intval($_POST['recipe_id']);
$userId = 1;

$stmt = $pdo->prepare("
  INSERT IGNORE INTO favorites (user_id, recipe_id)
  VALUES (?, ?)
");
$stmt->execute([$userId, $recipeId]);

// return updated count
$count = $pdo->query("
  SELECT COUNT(*) FROM favorites WHERE user_id = 1
")->fetchColumn();

echo json_encode(["count" => $count]);
