var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Transaction;
}());
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransactions = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (balance, transaction) { return balance + transaction.amount; }, 0);
    };
    Customer.prototype.addTransaction = function (amount) {
        if (amount >= 0) {
            var date = new Date();
            this.transactions.push(new Transaction(amount, date));
            return true;
        }
        return false;
    };
    return Customer;
}());
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        var customerExist = !this.customers.some(function (cust) { return cust.getId() === customer.getId(); });
        if (customerExist) {
            this.customers.push(customer);
            return true;
        }
        else {
            return false;
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (cust) { return cust.getId() === customerId; });
        if (customer) {
            return customer.addTransaction(amount);
        }
        return false;
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        var exitBranch = !this.branches.some(function (b) { return b.getName() === branch.getName(); });
        if (exitBranch) {
            this.branches.push(branch);
            return true;
        }
        return false;
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (branch.addCustomer(customer)) {
            return true;
        }
        return false;
    };
    Bank.prototype.addCustomerTransactions = function (branch, customerId, amount) {
        if (this.branches.includes(branch)) {
            return branch.addCustomerTransaction(customerId, amount);
        }
        return false;
    };
    Bank.prototype.findBranchByName = function (branchName) {
        var matchedBranches = this.branches.filter(function (branch) { return branch.getName() === branchName; });
        if (matchedBranches.length > 0) {
            return matchedBranches;
        }
        else {
            return null;
        }
    };
    Bank.prototype.checkBranch = function (branch) {
        if (this.branches.includes(branch)) {
            return true;
        }
        else {
            return false;
        }
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        if (!this.branches.includes(branch)) {
            console.log("This branch not Exitst");
            return;
        }
        console.log("Customers for Branch: ".concat(branch.getName()));
        branch.getCustomers().forEach(function (customer) {
            console.log("Customer: ".concat(customer.getName()));
            if (includeTransactions) {
                console.log("Transactions:");
                customer.getTransactions().forEach(function (transaction) {
                    console.log("  Amount: ".concat(transaction.amount, ", Date: ").concat(transaction.date));
                });
            }
        });
    };
    return Bank;
}());
console.log("------------------ Example 1: -----------------\n");
console.log("------ Create a Bank and Branch --------\n");
var myBank = new Bank("My Bank");
var branchA = new Branch("Branch A");
console.log(myBank.addBranch(branchA));
console.log("------  Add Customers to a Branch --------\n");
var customer1 = new Customer("Alice", 101);
var customer2 = new Customer("Bob", 102);
console.log(branchA.addCustomer(customer1));
console.log(branchA.addCustomer(customer2));
console.log("Customers added to Branch A:");
console.log("Customer 1 - Name:", customer1.getName(), "ID:", customer1.getId());
console.log("Customer 2 - Name:", customer2.getName(), "ID:", customer2.getId());
console.log("------  Add Transactions for Customers: --------\n");
customer1.addTransaction(1000); // Depositing $1000
customer2.addTransaction(-500); // Withdrawing $500 (negative amount)
console.log("Transactions added for Alice and Bob:");
console.log("Alice's Transactions:", customer1.getTransactions());
console.log("Bob's Transactions:", customer2.getTransactions());
console.log("------  Check Customer Balance: --------\n");
var balance1 = customer1.getBalance(); // Get Alice's balance
var balance2 = customer2.getBalance(); // Get Bob's balance
console.log("Alice's Balance:", balance1);
console.log("Bob's Balance:", balance2);
console.log("------  Add Transactions to Customers via Branch: --------\n");
console.log(branchA.addCustomerTransaction(101, 200)); // Deposit $200 to Alice's account
console.log(branchA.addCustomerTransaction(102, -100)); // Withdraw $100 from Bob's account
console.log("Transactions added via Branch:");
console.log("Alice's Transactions:", customer1.getTransactions());
console.log("Bob's Transactions:", customer2.getTransactions());
console.log("------ . List Customers and Their Transactions : --------\n");
console.log("List of Customers and Their Transactions for Branch A:");
console.log(myBank.listCustomers(branchA, true));
console.log("------ Find a Branch by Name : --------\n");
var foundBranches = myBank.findBranchByName("Branch A"); // Find branches by name
console.log("Found Branches by Name:", foundBranches);
console.log("------  Check if a Branch Exists in the Bank : --------\n");
var branchExists = myBank.checkBranch(branchA); // Check if a branch exists in the bank
console.log("Branch A Exists in the Bank:", branchExists);
console.log("------------------------ Example 2 : ----------------------------------\n");
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer3 = new Customer("John", 1);
var customer4 = new Customer("Anna", 2);
var customer5 = new Customer("John", 3);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("Sun Branch"));
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(westBranch, customer5);
arizonaBank.addCustomer(sunBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer4);
arizonaBank.addCustomerTransactions(westBranch, customer3.getId(), 3000);
arizonaBank.addCustomerTransactions(westBranch, customer3.getId(), 2000);
arizonaBank.addCustomerTransactions(westBranch, customer4.getId(), 3000);
customer1.addTransaction(-1000); // null
console.log(customer3.getBalance());
arizonaBank.listCustomers(westBranch, true);
arizonaBank.listCustomers(sunBranch, true);
