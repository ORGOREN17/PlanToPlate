<?php
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "message" => "Invalid request method"]);
  exit;
}

// DB-only: accept whatever JS sends (still sanitize a bit)
$fullName   = trim($_POST["full_name"] ?? "");
$email      = trim($_POST["email"] ?? "");
$weekStart  = $_POST["week_start"] ?? null;
$mealsCount = isset($_POST["meals_count"]) ? (int)$_POST["meals_count"] : null;
$diet       = $_POST["diet"] ?? "none";
$notes      = trim($_POST["notes"] ?? "");

try {
  $sql = "
    INSERT INTO meal_plans (full_name, email, week_start, meals_count, diet, notes)
    VALUES (:full_name, :email, :week_start, :meals_count, :diet, :notes)
  ";

  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ":full_name"   => $fullName,
    ":email"       => $email,
    ":week_start"  => $weekStart,
    ":meals_count" => $mealsCount,
    ":diet"        => $diet,
    ":notes"       => $notes
  ]);

  echo json_encode(["ok" => true]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => $e->getMessage()]);}
