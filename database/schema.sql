-- Database schema for Barangay Attendance System
CREATE DATABASE IF NOT EXISTS barangay_attendance;
USE barangay_attendance;

-- Officials table
CREATE TABLE officials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance records
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    official_id INT NOT NULL,
    time_in DATETIME NOT NULL,
    time_out DATETIME,
    status ENUM('present', 'absent', 'late', 'on_leave') DEFAULT 'present',
    notes TEXT,
    FOREIGN KEY (official_id) REFERENCES officials(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO officials (first_name, last_name, position, contact_number, email)
VALUES 
    ('Juan', 'Dela Cruz', 'Barangay Captain', '09123456789', 'juan.delacruz@example.com'),
    ('Maria', 'Santos', 'Barangay Secretary', '09123456788', 'maria.santos@example.com');
