<?php
require_once "db.php";

$pdo->query("DELETE FROM favorites WHERE user_id = 1");

echo json_encode(["count" => 0]);
