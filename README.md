# isobathytherm-Bamazon


## **LINK TO APP VIDEO**



## **OVERVIEW**

In this assignment, I was tasked with creating an Amazon-like storefront utilizing MySQL. The app will take orders from customers and updating stock quanities, as well as allow for mananager functions. Such as adding products and inventory.


## **TECHNOLOGIES USED**

### **JavaScript:**
#### **Platforms:**
* Node – used to run commands for Bamazon App
* MySql - used to create table and table data


## **APP FUNCTION**
### **Customer Level:**
In the terminal the customer will be given a list of all products that the store currently has. The customer will see the Item ID, Product name, and Product Cost.
### **Functions:**
* Using inquirer the customer will receive 2 prompts:
* The first: asking the item id of the product they would like to buy they would like to buy.
* The second asking how many units/pieces they would like to purchase.
* Once the customer responses have been received, a function will run to determine if there is enough stock to complete the order. If there isn’t, they will receive and alert. 
* If the store does have stock available, the order will be completed, and the customer will be advised of the final cost. 


### **Manager level:**
In the terminal, using inquirer the manager will be giving a list of menu options to select from, each option has a function associated with it.
### **Functions:**
#### **View Products For Sale:**
* This function will list all the items for sale, in table form, and will include Item ID, Item Name, Description,  Price, and Available Stock Quantity.
#### **View Low Inventory::**
* This function will list all items that have five or less pieces in stock.
#### **Add To Inventory::**
* This function will allow the manager to add inventory to any items currently being sold in the store. 
#### **Add New Products:**
* This function will allow the manager to add a completely new product to the store. 

## **CODE EXAMPLE** (see video for full program):
#### **To begin, set-up included the following:**
* npm init -y – to initialize package.json – this is required for installing npm third party packages
* gitignore – used so git won’t track files(commit to Github)
* Keys.js – use to hide Spotify API keys
* .env -  holds Spotify API keys
* Packages installed
  - npm install mysql
  - npm install inquirer
  - npm install cli-table
  - npm install dotenv
#### **The code for this program consist of:** 
	
* Functions:
  - Each function was set-up to do the following:
     * Take the command line input
     * Run through arguments
     * Output data/Update Chart
