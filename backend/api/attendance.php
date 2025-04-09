<?php
header('Content-Type: application/json');
require_once '../../database/db_connect.php';

try {
    // Get all attendance records
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $conn->query("
            SELECT a.*, o.first_name, o.last_name, o.position 
            FROM attendance a
            JOIN officials o ON a.official_id = o.id
            ORDER BY a.time_in DESC
        ");
        $attendance = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $attendance]);
    }
    // Record time in/out
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['time_in'])) {
            // Time in
            $stmt = $conn->prepare("
                INSERT INTO attendance (official_id, time_in, status)
                VALUES (:official_id, NOW(), :status)
            ");
            $stmt->execute([
                ':official_id' => $data['official_id'],
                ':status' => $data['status'] ?? 'present'
            ]);
        } else {
            // Time out
            $stmt = $conn->prepare("
                UPDATE attendance 
                SET time_out = NOW()
                WHERE official_id = :official_id AND time_out IS NULL
                ORDER BY time_in DESC LIMIT 1
            ");
            $stmt->execute([':official_id' => $data['official_id']]);
        }
        
        echo json_encode(['success' => true, 'message' => 'Attendance recorded successfully']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
