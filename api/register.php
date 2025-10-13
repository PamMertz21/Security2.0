<?php
require __DIR__.'/db.php';
cors_json_headers();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['username']) || empty($input['email']) || empty($input['password'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid input']);
  exit;
}

$username = trim($input['username']);
$email = trim($input['email']);
$passwordHash = password_hash($input['password'], PASSWORD_BCRYPT);

try {
  $pdo->beginTransaction();
  $stmt = $pdo->prepare('INSERT INTO users (user_id, username, email, password_hash) VALUES (?, ?, ?)');
  $stmt->execute([$username, $email, $passwordHash]);
  $userId = (int)$pdo->lastInsertId();

  // Optional: insert profile if provided
  if (!empty($input['profile'])) {
    $p = $input['profile'];
    $stmtP = $pdo->prepare('INSERT INTO profiles (user_id, first_name, middle_initial, last_name, suffix, birthdate, age, sex) VALUES (?,?,?,?,?,?,?,?)');
    $stmtP->execute([
      $userId,
      $p['firstName'] ?? '',
      $p['middleInitial'] ?? null,
      $p['lastName'] ?? '',
      $p['suffix'] ?? null,
      $p['birthdate'] ?? null,
      isset($p['age']) ? (int)$p['age'] : null,
      $p['sex'] ?? null,
    ]);
  }

  // Optional: insert address if provided
  if (!empty($input['address'])) {
    $a = $input['address'];
    $stmtA = $pdo->prepare('INSERT INTO addresses (user_id, purok, barangay, city, province, country, zip) VALUES (?,?,?,?,?,?,?)');
    $stmtA->execute([
      $userId,
      $a['purok'] ?? null,
      $a['barangay'] ?? null,
      $a['city'] ?? null,
      $a['province'] ?? null,
      $a['country'] ?? null,
      $a['zip'] ?? null,
    ]);
  }

  $pdo->commit();
  echo json_encode(['ok' => true, 'user' => ['id' => $userId, 'username' => $username, 'email' => $email]]);
} catch (PDOException $e) {
  $pdo->rollBack();
  if ($e->getCode() === '23000') { // unique violation
    http_response_code(409);
    echo json_encode(['error' => 'Username or email already exists']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed']);
  }
}
