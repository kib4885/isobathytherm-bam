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
    runsearch();

});

function runsearch() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("");
        console.log("LIST OF PRODUCTS");

        var table = new Table({
            head: ['ITEM ID', 'PRODUCT NAME', 'PRICE']
            , colWidths: [12, 30, 8]
        });


        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$ " + res[i].price,]);
        }
        console.log(table.toString());
        console.log("-----------------------------------");
        order();

    });
}

function order() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("")
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
                    message: "What is the ID of the item you would like to buy?"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many would you like to buy?",

                }

            ])
            .then(function (answer) {
                var orderItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.id)) {
                        orderItem = res[i];
                        // console.log(orderItem);
                        if (answer.stock > orderItem.stock_quantity) {
                            console.log("Sorry that item is no longer available");

                        }
                        else {
                            connection.query(

                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: orderItem.stock_quantity - answer.stock
                                    },
                                    {
                                        item_id: orderItem.item_id
                                    }
                                ],


                                function (error) {
                                    var total = answer.stock * orderItem.price
                                    if (error) throw err;
                                    console.log("-----------------------------------")
                                    console.log("Your Purchase total is $" + total);
                                    console.log("-----------------------------------");
                                    order()
                                }
                            )
                        }

                    }
                }


            });
    });
}
