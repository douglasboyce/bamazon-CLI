var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Bike592677",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\n" + res[i].item_id + " " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price) + " | " + res[i].stock_quantity;
    }
    console.log("\n")

    queryProduct();
  })

}

function queryProduct() {
  inquirer.prompt([

    {
      name: "choice",
      type: "input",
      message: "Which product would you like to purchase?"

    },

    {
      type: "input",
      name: "quantity",
      message: "How many would you like to purchase?"
    }


  ]).then(function (answer) {
    console.log('Product to purchse: ' + answer.choice);
    console.log('Quantity to purchase: ' + answer.quantity);

    console.log("Selecting price from product...\n");
    connection.query('SELECT price FROM products where item_id=' + answer.choice, function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      let quantity = parseInt(answer.quantity);
      let price = JSON.stringify(res.price);
      console.log(parseInt(res));

      console.log('Your total costs is: $' + (quantity * price));
      purchaseAgain();
    });
  });
}

function purchaseAgain() {
  inquirer.prompt([

    {
      name: "yesOrno",
      type: "rawlist",
      message: "Would you like to purchase another item (yes or no)?",
      choices: ["yes", "no"]
    }
  ]).then(function (answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.yesOrno.toUpperCase() === "NO") {
      console.log(", exiting the bamazon customer app");
      console.log('\ngoodbye!')
      connection.end();
    } else {
      displayProducts();
    }
  })
}
