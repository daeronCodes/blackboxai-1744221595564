<?php
header('Content-Type: application/json');
require_once '../../database/db_connect.php';

try {
    // Get all officials
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $conn->query("SELECT * FROM officials");
        $officials = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $officials]);
    }
    // Add new official
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $conn->prepare("INSERT INTO officials (first_name, last_name, position, contact_number, email) 
                               VALUES (:first_name, :last_name, :position, :contact_number, :email)");
        $stmt->execute([
            ':first_name' => $data['first_name'],
            ':last_name' => $data['last_name'],
            ':position' => $data['position'],
            ':contact_number' => $data['contact_number'],
            ':email' => $data['email']
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Official added successfully']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
