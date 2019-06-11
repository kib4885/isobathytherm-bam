require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.PASSWORD,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    managerOptions();

});
function managerOptions() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "Please select option to proceed.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.options === "View Products for Sale") {
                productsforSale()
            }

            else if (answer.options === "View Low Inventory") {
                lowInventory()
            }
            else if (answer.options === "Add to Inventory") {
                addInventory()
            }
            else if (answer.options === "Add New Product") {
                newProduct()
            }

        })
}


//the app should list every available item: the item IDs, names, prices, and quantities.
function productsforSale() {

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;
        console.log("");
        console.log("LIST OF PRODUCTS");

        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'DEPARTMENT', 'PRICE', 'STOCK QUANTITY'],
            colWidths: [12, 30, 20, 8, 20]
        });


        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$ " + res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("-----------------------------------");
        managerOptions()
    });

}
//should list all items with an inventory count lower than five
function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        var lowInventory;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                var lowInventory = res[i];
                console.log(lowInventory);
                console.log("")
                managerOptions()
            }
        }

    })
}
//app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].item_id);
                        }
                        return choiceArray;

                    },
                    message: "What is the ID of the item you want to add stock to?"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "Add how much stock?",
                }
            ])
            .then(function (answer) {
                var orderItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.id)) {
                        orderItem = res[i];
                        // console.log(orderItem);
                        if (answer.stock !== orderItem.stock_quantity) {

                            connection.query(

                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: (orderItem.stock_quantity) + parseInt(answer.stock)
                                    },
                                    {
                                        item_id: orderItem.item_id
                                    }
                                ],

                                function (error) {
                                    if (error) throw err;
                                    console.log("Inventory Update Successful.")
                                    console.log("")
                                    managerOptions()
                                }
                            )
                        }

                    }
                }
                
            });

    });

}
//allow the manager to add a completely new product to the store
function newProduct() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the product ID?"
            },
            {
                name: "product",
                type: "input",
                message: "What is the Product Name?"
            },
            {
                name: "department",
                type: "input",
                message: "What is the Department?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the Price?"
            },
            {
                name: "stock",
                type: "input",
                message: "How much stock?"
            },
        ])

        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    item_id: answer.id || 0,
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price || 0,
                    stock_quantity: answer.stock || 0
                    
                },
                managerOptions()
                
            )

        })

}

