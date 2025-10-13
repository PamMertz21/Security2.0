<?php
require __DIR__.'/db.php';
cors_json_headers();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['username'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Username required']);
  exit;
}

$username = trim($input['username']);

try {
  // Get user_id from username
  $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
  $stmt->execute([$username]);
  $user = $stmt->fetch();
  
  if (!$user) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
  }
  
  $userId = $user['id'];
  
  // Get user's security questions (without answers)
  $stmt = $pdo->prepare('SELECT question FROM user_security_questions WHERE user_id = ? ORDER BY id LIMIT 3');
  $stmt->execute([$userId]);
  $questions = $stmt->fetchAll(PDO::FETCH_COLUMN);
  
  if (count($questions) < 3) {
    http_response_code(400);
    echo json_encode(['error' => 'User has not set up security questions']);
    exit;
  }
  
  echo json_encode([
    'ok' => true, 
    'user_id' => $userId,
    'questions' => $questions
  ]);
  
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Database error']);
}
