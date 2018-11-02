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
  console.log("I am here");
  displayProducts();
});

function displayProducts() {
  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function (err, data) {
    if (err) throw err;

    console.log('Existing Inventory:');
    console.log('........-------...........\n');


    var strOut = '';
    for (var i = 0; i < data.length; i++) {
      strOut = '';
      strOut += 'Item ID: ' + data[i].item_id + ' | ';
      strOut += 'Product Name: ' + data[i].product_name + ' | ';
      strOut += 'Department: ' + data[i].department_name + ' | ';
      strOut += 'Price: $' + data[i].price + ' | ';;
      strOut += 'Stock Quantity : ' + data[i].stock_quantity + '\n';

      console.log(strOut);
    }

    console.log("---------------------------------------------------------------------\n\n");

    //Prompt the user for item/quantity they would like to purchase

    userInput();
  })

}


// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole non-zero number.';
  }
}

function userInput() {
  inquirer.prompt([

    {
      name: "choice",
      type: "list",
      choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      message: "What item would you like to purchase?"
    },


    {
      type: 'input',
      name: 'quantity',
      message: 'What quantity do you need?',
      validate: validateInput,
      filter: Number
    }


  ]).then(function (input) {
    // console.log('Customer has selected: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.quantity);

    let item = input.choice;
    let quantity = input.quantity;

    //Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, {
      item_id: item
    }, function (err, data) {
      if (err) throw err;
      // Log all results of the SELECT statement
      var productData = data[0];

      // console.log('productData = ' + JSON.stringify(productData));
      // console.log('productData.stock_quantity = ' + productData.stock_quantity);
      // console.log('productData.price =  ' + productData.price);
      if (productData.stock_quantity < quantity) {
        console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
        console.log('Please modify your order.\n');
        displayProducts();

      } else {
        // Construct the updating query string
        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
        // console.log('updateQueryStr = ' + updateQueryStr);

        // Update the inventory
        connection.query(updateQueryStr, function (err, data) {
          if (err) throw err;
          console.log("\n\n---------------------------------------------------------------------");
          console.log('Your order has been placed! Your total is $' + productData.price * quantity);
          console.log('Thank you for your order!');
          console.log('---------------------------\n');
          purchaseAgain();
        })
      }
    });
  })
}

function purchaseAgain() {
  inquirer.prompt([

    {
      name: "yesOrno",
      type: "list",
      message: "Would you like to purchase another item (yes or no)?",
      choices: ["yes", "no"]
    }
  ]).then(function (answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.yesOrno.toUpperCase() === "NO") {
      console.log("Exiting the bamazon customer app");
      console.log('\ngoodbye!')
      connection.end();
    } else {
      displayProducts();
    }
  })
}