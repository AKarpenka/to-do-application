CREATE DATABASE todoapp;

CREATE TABLE todos(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

-- INSERT INTO todos(id, user_email, title, progress ,date) VALUES('0','nastya123@some.com', 'First todo', 10, 'Thu July 19 2023 12:44:45 GMT+0400 (Gulf Standard Time)')