-- ============================================================
-- invertory project: database setup
-- Run this file once to create the database and all tables.
-- It is safe to run again: it never deletes existing data.
-- ============================================================

CREATE DATABASE IF NOT EXISTS STUDY;
USE STUDY;

-- ------------------------------------------------------------
-- inv: simple users (name + email), used by /api/users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inv (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);

-- ------------------------------------------------------------
-- s_users: stock system users, used by /api/register and /api/login
-- role is either 'adder' or 'remover'
-- password stores a bcrypt hash, never the real password
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS s_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- ------------------------------------------------------------
-- stock: the items, used by /api/stock
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stock (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'in stock'
);

-- ------------------------------------------------------------
-- sessions: one row per logged-in user (the login token)
-- logout deletes the row
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
  token VARCHAR(100) PRIMARY KEY,
  user_id INT NOT NULL
);
