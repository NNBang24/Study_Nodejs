CREATE DATABASE library_management_dev;
USE library_management_dev;
-- Bảng Authors (Tác giả)
CREATE TABLE Authors (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) NOT NULL,
 bio TEXT,
 createdAt DATETIME,
 updatedAt DATETIME
);
-- Bảng Books (Sách)
CREATE TABLE Books (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255) NOT NULL,
 isbn VARCHAR(13) UNIQUE NOT NULL,
 publishYear INT,
 authorId INT,
 FOREIGN KEY (authorId) REFERENCES Authors(id),
 createdAt DATETIME,
 updatedAt DATETIME
);
-- Bảng Members (Thành viên)
CREATE TABLE Members (
 id INT AUTO_INCREMENT PRIMARY KEY,
 membershipId VARCHAR(255) UNIQUE NOT NULL,
 email VARCHAR(255) NOT NULL,
 createdAt DATETIME,
 updatedAt DATETIME
);
-- Bảng MemberDetails (Chi tiết thành viên)
CREATE TABLE MemberDetails (id INT AUTO_INCREMENT PRIMARY KEY,
 firstName VARCHAR(255),
 lastName VARCHAR(255),
 phone VARCHAR(20),
 memberId INT UNIQUE NOT NULL,
 FOREIGN KEY (memberId) REFERENCES Members(id) ON DELETE CASCADE,
 createdAt DATETIME,
 updatedAt DATETIME
);
-- Bảng Genres (Thể loại)
CREATE TABLE Genres (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255) UNIQUE NOT NULL,
 description TEXT,
 createdAt DATETIME,
 updatedAt DATETIME
);
-- Bảng BookGenres (Quan hệ giữa Books và Genres)
CREATE TABLE BookGenres (
 id INT AUTO_INCREMENT PRIMARY KEY,
 bookId INT,
 genreId INT,
 FOREIGN KEY (bookId) REFERENCES Books(id) ON DELETE CASCADE,
 FOREIGN KEY (genreId) REFERENCES Genres(id) ON DELETE CASCADE,
 createdAt DATETIME,
 updatedAt DATETIME,
 UNIQUE INDEX bookGenreIndex (bookId, genreId)
);
-- Chèn dữ liệu mẫu
INSERT INTO Authors (name, bio, createdAt, updatedAt) VALUES
 ('J.K. Rowling', 'Tác giả nổi tiếng với Harry Potter', NOW(), NOW()),
 ('Nguyễn Nhật Ánh', 'Nhà văn Việt Nam nổi tiếng với truyện thiếu nhi', NOW(), NOW());
INSERT INTO Books (title, isbn, publishYear, authorId, createdAt, updatedAt) VALUES
 ('Harry Potter và Hòn Đá Phù Thủy', '9780747532699', 1997, 1, NOW(), NOW()),
 ('Cho Tôi Xin Một Vé Đi Tuổi Thơ', '9786042020138', 2008, 2, NOW(), NOW());
INSERT INTO Members (membershipId, email, createdAt, updatedAt) VALUES
 ('MEM001', 'alice@example.com', NOW(), NOW()),
 ('MEM002', 'bob@example.com', NOW(), NOW());
INSERT INTO MemberDetails (firstName, lastName, phone, memberId, createdAt, updatedAt) VALUES
 ('Alice', 'Johnson', '1234567890', 1, NOW(), NOW()),
 ('Bob', 'Smith', '0987654321', 2, NOW(), NOW());
INSERT INTO Genres (name, description, createdAt, updatedAt) VALUES
 ('Fantasy', 'Thể loại giả tưởng', NOW(), NOW()),
 ('Children', 'Sách dành cho thiếu nhi', NOW(), NOW());
INSERT INTO BookGenres (bookId, genreId, createdAt, updatedAt) VALUES
 (1, 1, NOW(), NOW()), -- Harry Potter: Fantasy
 (2, 2, NOW(), NOW()); -- Cho Tôi Xin Một Vé: Children
