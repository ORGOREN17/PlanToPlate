<?php
require_once "db.php";

$search   = $_GET['search'] ?? '';
$category = $_GET['category'] ?? 'all';

$sql = "SELECT * FROM recipes WHERE 1=1";
$params = [];

if ($category !== 'all') {
    $sql .= " AND category = ?";
    $params[] = $category;
}

if ($search) {
    $sql .= " AND title LIKE ?";
    $params[] = "%$search%";
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode($stmt->fetchAll());
