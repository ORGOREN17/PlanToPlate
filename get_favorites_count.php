<?php
require_once "db.php";
header("Content-Type: application/json");

$userId = 1;

$stmt = $pdo->prepare("
  SELECT r.*
  FROM favorites f
  JOIN recipes r ON r.id = f.recipe_id
  WHERE f.user_id = ?
");
$stmt->execute([$userId]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
