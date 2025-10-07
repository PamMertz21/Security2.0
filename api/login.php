<?php
require __DIR__.'/db.php';
cors_json_headers();

$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['username'], $input['password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid input']);
  exit;
}

$username = trim($input['username']);
$password = $input['password'];

$stmt = $pdo->prepare('SELECT id, username, email, password_hash FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
  http_response_code(401);
  echo json_encode(['error' => 'Invalid credentials']);
  exit;
}

unset($user['password_hash']);

echo json_encode(['ok' => true, 'user' => $user]);
