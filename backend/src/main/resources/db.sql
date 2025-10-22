-- db.sql
-- MySQL schema and sample data for HealthCareApplication
-- Run: mysql -u <user> -p healthdb < db.sql

 CREATE DATABASE IF NOT EXISTS healthdb;

use healthdb;

-- Drop tables if they exist (safe for idempotent run during development)
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS=1;

-- Users table
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  mobile VARCHAR(20),
  email VARCHAR(150),
  dob DATE,
  gender VARCHAR(20),
  pincode VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Coaches table
CREATE TABLE coaches (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  mobile VARCHAR(20),
  gender VARCHAR(20),
  dob DATE,
  specialty VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Appointments table
CREATE TABLE appointments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  coach_id BIGINT NOT NULL,
  appointment_date DATE,
  slot VARCHAR(50),
  description TEXT,
  status VARCHAR(20) DEFAULT 'PENDING',
  coach_comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_appointments_user ON appointments(user_id);
CREATE INDEX idx_appointments_coach ON appointments(coach_id);

-- Sample data
INSERT INTO users (username, password, email, city) VALUES
('alice', 'password', 'alice@example.com', 'Metropolis');

INSERT INTO coaches (username, password, specialty) VALUES
('drbob', 'password', 'Fitness Coach');

-- Sample appointment linking the sample user and coach
INSERT INTO appointments (user_id, coach_id, appointment_date, slot, description, status)
VALUES (
  (SELECT id FROM users WHERE username='alice' LIMIT 1),
  (SELECT id FROM coaches WHERE username='drbob' LIMIT 1),
  '2025-10-23', '09:00-09:30', 'Initial consultation', 'PENDING'
);

-- End of file
