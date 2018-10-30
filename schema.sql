//schema.sql
DROP bamzon IF EXISTS
CREATE DATABASE bamazon;

USE bamazon

CREATE TABLE products (
    item_id INT NOT NULL Auto_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price INT,
    stock_quantity INT
    PRIMARY KEY(item_id)
)

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES ("Samsung TV", "Electronics", 150, 100), ("Great Plains Tent", "Outdoors", 49, 50), ("Toro 22 inch mower", "Lawn and Garden", 325, 50);

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES ("HP Laptop", "Electronics", 750, 25), ("Propane Lantern", "Outdoors", 25, 10), ("Toro Gas Blower", "Lawn and Garden", 125, 10);

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES ("Bamzon music player", "Electronics", 50, 25), ("Sleeping Bags", "Outdoors", 25, 15), ("Hedge clippers", "Lawn and Garden", 25, 15), ("Sunlight Toaster", "Home Electronics", 15, 5);
