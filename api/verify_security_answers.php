<?php
require __DIR__.'/db.php';
cors_json_headers();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['user_id']) || empty($input['answers']) || !is_array($input['answers'])) {
  http_response_code(400);
  echo json_encode(['error' => 'User ID and answers required']);
  exit;
}

$userId = trim($input['user_id']);
$answers = $input['answers'];

try {
  // Get user's security questions and hashed answers
  $stmt = $pdo->prepare('SELECT question, answer_hash FROM user_security_questions WHERE user_id = ? ORDER BY id LIMIT 3');
  $stmt->execute([$userId]);
  $securityData = $stmt->fetchAll();
  
  if (count($securityData) < 3) {
    http_response_code(400);
    echo json_encode(['error' => 'User has not set up security questions']);
    exit;
  }
  
  // Verify each answer
  $allCorrect = true;
  for ($i = 0; $i < 3; $i++) {
    if (!isset($answers[$i]) || !password_verify($answers[$i], $securityData[$i]['answer_hash'])) {
      $allCorrect = false;
      break;
    }
  }
  
  if (!$allCorrect) {
    http_response_code(401);
    echo json_encode(['error' => 'Incorrect answers']);
    exit;
  }
  
  // Generate a temporary token for password reset (valid for 15 minutes)
  $token = bin2hex(random_bytes(32));
  $expiresAt = date('Y-m-d H:i:s', time() + 900); // 15 minutes from now
  
  // Store token in database (you might want to create a password_reset_tokens table)
  // For now, we'll use a simple approach with a JSON response
  echo json_encode([
    'ok' => true,
    'token' => $token,
    'expires_at' => $expiresAt,
    'message' => 'Answers verified. You can now reset your password.'
  ]);
  
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Database error']);
}
