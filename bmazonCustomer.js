var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3006,

  // Your username
  user: "root",

  // Your password
  password: "Bike592677",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected at " + port);
});

function displayProducts() {
    var query = "SELECT * FROM bamazon";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].product_name + "||" + res[i].department_name + "||" + res[i].price + 
        "||" + res[i].stock_quantity);
      }
    });
}
