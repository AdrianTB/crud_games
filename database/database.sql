CREATE DATABASE ng_games_db;

USE ng_games_db;

CREATE TABLE game (

    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(180),
    description VARCHAR(200),
    image VARCHAR(200),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

RENAME TABLE game to games;

DESCRIBE games;