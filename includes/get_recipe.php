<?php
require "../db.php";

$id = intval($_GET['id']);

$recipe = $conn->query("SELECT * FROM recipes WHERE id=$id")->fetch_assoc();

$ingredients = [];
$res = $conn->query("SELECT name FROM ingredients WHERE recipe_id=$id");
while ($r = $res->fetch_assoc()) {
    $ingredients[] = $r["name"];
}

$instructions = [];
$res = $conn->query("SELECT step_number, description FROM instructions WHERE recipe_id=$id ORDER BY step_number");
while ($r = $res->fetch_assoc()) {
    $instructions[] = $r;
}

echo json_encode([
    "recipe" => $recipe,
    "ingredients" => $ingredients,
    "instructions" => $instructions
]);
