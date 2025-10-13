<?php
require __DIR__.'/db.php';
cors_json_headers();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['user_id']) || empty($input['token']) || empty($input['new_password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'User ID, token, and new password required']);
  exit;
}

$userId = trim($input['user_id']);
$token = trim($input['token']);
$newPassword = $input['new_password'];

// Basic password validation
if (strlen($newPassword) < 8) {
  http_response_code(400);
  echo json_encode(['error' => 'Password must be at least 8 characters long']);
  exit;
}

try {
  // In a real implementation, you'd verify the token from a password_reset_tokens table
  // For now, we'll accept any token (you should implement proper token validation)
  
  // Check if user exists
  $stmt = $pdo->prepare('SELECT id FROM users WHERE id = ?');
  $stmt->execute([$userId]);
  $user = $stmt->fetch();
  
  if (!$user) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found']);
    exit;
  }
  
  // Hash the new password
  $passwordHash = password_hash($newPassword, PASSWORD_BCRYPT);
  
  // Update password
  $stmt = $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
  $stmt->execute([$passwordHash, $userId]);
  
  // In a real implementation, you'd also delete/invalidate the token here
  
  echo json_encode([
    'ok' => true,
    'message' => 'Password reset successfully'
  ]);
  
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Database error']);
}
