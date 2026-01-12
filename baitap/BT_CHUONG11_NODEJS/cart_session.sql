CREATE DATABASE cart_session ;
USE cart_session;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create  table if not exists sessions ( 
    session_id VARCHAR(128) collate utf8mb4_bin NOT NULL PRIMARY KEY ,
    expires INT(11) unsigned NOT NULL ,
    data mediumtext collate utf8mb4_bin
 );