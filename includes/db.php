<?php
$host = "localhost";
$db   = "orgo3_project";
$user = "orgo3_goren";
$pass = "N,7*vs{fu(JqWHCI";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}
