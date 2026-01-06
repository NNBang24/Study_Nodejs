create database quan_ly_anh_su_kien ;
use quan_ly_anh_su_kien ;



create table Users (
	id int auto_increment primary key ,
    username varchar(255) unique not null ,
    email varchar(255) not null  ,
    password varchar(255) not null ,
    role varchar(255) not null ,
    createdAt datetime ,
    updatedAt datetime
);
create table Events (
	id int primary key auto_increment ,
    title varchar(255) not null ,
    image varchar(255) ,
	userId INT NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME,
    CONSTRAINT fk_event_user
        FOREIGN KEY (userId)
        REFERENCES Users(id)
        ON DELETE CASCADE
    
);