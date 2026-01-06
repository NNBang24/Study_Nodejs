create database api_blog ;
use api_blog  ;

create table Users (
	id int auto_increment primary key ,
    username varchar(255) unique not null ,
    email varchar(255) not null  ,
    password varchar(255) not null ,
    role varchar(255) not null ,
    createdAt datetime ,
    updatedAt datetime
);

create table Posts (
	id int auto_increment primary key , 
    title varchar(255) not null ,
    content text not null ,
    userId int not null ,
	createdAt datetime ,
    updatedAt datetime ,
    foreign key (userId) references Users(id)  
    
);

select * from Users ;