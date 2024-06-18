CREATE DATABASE db_food;
USE db_food;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE restaurant (
    res_id INT PRIMARY KEY AUTO_INCREMENT,
    res_name VARCHAR(100),
    Image VARCHAR(100),
    `desc` VARCHAR(255)
);

CREATE TABLE food_type (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(100)
);

CREATE TABLE food (
    food_id INT PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(100),
    image VARCHAR(100),
    price FLOAT,
    `desc` VARCHAR(255),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);

CREATE TABLE sub_food (
    sub_id INT PRIMARY KEY AUTO_INCREMENT,
    sub_name VARCHAR(100),
    sub_price FLOAT,
    food_id INT,
    FOREIGN KEY (food_id) REFERENCES food(food_id)
);

CREATE TABLE like_res (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    res_id INT,
    date_like DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE rate_res (
    rate_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE `order` (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    food_id INT,
    amount INT,
    code VARCHAR(50),
    arr_sub_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
);


INSERT INTO user (full_name, email, password) VALUES 
('Alice', 'alice@example.com', 'password1'),
('Bob', 'bob@example.com', 'password2'),
('Charlie', 'charlie@example.com', 'password3'),
('David', 'david@example.com', 'password4'),
('Eve', 'eve@example.com', 'password5'),
('Frank', 'frank@example.com', 'password6'),
('Harry', 'harry@example.com', 'password7'),
('Henry', 'henry@example.com', 'password8'),
('Isabel', 'isabel@example.com', 'password9'),
('Jack', 'jack@example.com', 'password10');



INSERT INTO restaurant (res_name, Image, `desc`) VALUES 
('Restaurant A', 'image1.jpg', 'Best restaurant in town'),
('Restaurant B', 'image2.jpg', 'Amazing entrees'),
('Restaurant C', 'image3.jpg', 'Great food variety'),
('Restaurant D', 'image4.jpg', 'Cozy atmosphere and great steaks');



INSERT INTO food_type (type_name) VALUES 
('Italian'), 
('Vietnam'), 
('Mexican'),
('Japanese'), 
('American'), 
('Chinese');


INSERT INTO food (food_name, image, price, `desc`, type_id) VALUES 
('Pizza', 'pizza.jpg', 10.99, 'Delicious cheese pizza', 1),
('Pasta', 'pasta.jpg', 8.99, 'Classic Italian pasta', 1),
('Pho', 'pho.jpg', 7.99, 'Vietnamese food', 2),
('Tacos', 'tacos.jpg', 9.99, 'Crunchy Mexican tacos', 3),
('Sushi', 'sushi.jpg', 12.99, 'Fresh sushi rolls', 4),
('Steak', 'steak.jpg', 15.99, 'Juicy grilled steak', 5),
('Burger', 'burger.jpg', 9.99, 'Classic American burger', 5),
('Dim Sum', 'dimsum.jpg', 10.99, 'Traditional Chinese dim sum', 6);




INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES 
('Extra Cheese', 2.00, 1),
('Garlic Bread', 1.50, 2),
('Extra Sauce', 0.50, 3),
('Guacamole', 1.00, 4),
('Miso Soup', 2.50, 5),
('French Fries', 2.00, 6),
('Dumplings', 1.50, 7),
('Egg Roll', 1.00, 8);



INSERT INTO like_res (user_id, res_id, date_like) VALUES 
(1, 1, '2024-04-01 07:00:00'),
(2, 1, '2024-04-02 11:00:00'),
(3, 1, '2024-04-03 12:00:00'),
(4, 2, '2024-04-04 11:00:00'),
(5, 3, '2024-04-05 14:00:00'),
(1, 2, '2024-04-06 15:00:00'),
(2, 3, '2024-04-07 16:00:00'),
(6, 4, '2024-04-08 15:00:00'),
(7, 2, '2024-04-09 18:00:00'),
(2, 2, '2024-05-10 19:00:00'),
(1, 3, '2024-05-11 14:00:00'),
(7, 1, '2024-05-12 21:00:00'),
(8, 2, '2024-05-13 20:00:00'),
(9, 4, '2024-05-14 11:00:00'),
(7, 3, '2024-05-15 08:00:00'),
(6, 3, '2024-05-16 09:00:00'),
(7, 4, '2024-05-17 10:00:00');


INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES 
(1, 1, 1, '2024-05-12 10:00:00'),
(2, 1, 4, '2024-05-15 11:00:00'),
(3, 2, 3, '2024-05-17 12:00:00'),
(4, 3, 1, '2024-05-19 13:00:00'),
(5, 1, 2, '2024-05-19 14:00:00'),
(6, 4, 4, '2024-05-20 15:00:00'),
(7, 2, 2, '2024-05-20 16:00:00'),
(8, 3, 3, '2024-05-20 17:00:00'),
(9, 4, 4, '2024-05-20 18:00:00');



INSERT INTO `order` (user_id, food_id, amount, code, arr_sub_id) VALUES 
(1, 1, 2, 'ORD001', '1,2'),
(2, 2, 1, 'ORD002', '2'),
(3, 3, 3, 'ORD003', '3'),
(4, 4, 1, 'ORD004', '4'),
(7, 1, 2, 'ORD005', '1,4'),
(6, 5, 2, 'ORD006', '5,6'),
(7, 6, 1, 'ORD007', '7'),
(8, 7, 3, 'ORD008', '8'),
(9, 8, 1, 'ORD009', '9'),
(7, 5, 2, 'ORD010', '5,8');




