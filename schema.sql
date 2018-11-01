//schema.sql
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price INT,
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung TV", "Electronics", 1000, 100), ("Great Plains Tent", "Outdoors", 49, 50), ("Toro 22 inch mower", "Lawn and Garden", 325, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bamazon player", "Electronics", 1000, 100), ("Great Plains Lantern", "Outdoors", 25, 50), ("Toro Blower", "Lawn and Garden", 50, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP 15 inch Laptop", "Electronics", 750, 200), ("Great Plains Sleeping Bags", "Outdoors", 25, 10), ("Hedge Trimmers", "Lawn and Garden", 25, 50), ("Stuffed Bear", "Toys", 25, 150);