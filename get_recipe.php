<?php
require_once "db.php";

$count = $pdo->query("
  SELECT COUNT(*) FROM favorites WHERE user_id = 1
")->fetchColumn();

echo json_encode(["count" => $count]);
