-- tao database 
create database if not exists exppress_auth_demo ;

-- su dung database vua tao 
use exppress_auth_demo ;

-- tao bang user users 
create table  if not exists users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(50) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL ,
    email VARCHAR(100) UNIQUE ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
 -- chen du lieu mau (password chua hash de demo don gian)
 -- luu y trong du an thuc te phai hash passwprd

 insert into users (username , password , email) values 
 ('testuser' ,'password123' ,'test@gmail.com') ,
 ('admin' .'admin123', 'admin@gmail.com') ;

 select * from users
 --

 use exppress_auth_demo ; 

 create  table if not exists sessions ( 
    session_id VARCHAR(128) collate utf8mb4_bin NOT NULL PRIMARY KEY ,
    expires INT(11) unsigned NOT NULL ,
    data mediumtext collate utf8mb4_bin
 )
