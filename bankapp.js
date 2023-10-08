class Transaction {
    constructor(amount, date) {
      this.amount = amount;
      this.date = date;
    }
  }
  
  class Customer {
    constructor(name, id) {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getTransactions() {
      return this.transactions;
    }
  
    getBalance() {
      return this.transactions.reduce((balance, transaction) => balance + transaction.amount, 0);
    }
  
    addTransaction(amount) {
      if (amount >= 0) {
        const date = new Date();
        this.transactions.push(new Transaction(amount, date));
        return true;
      }
      return false;
    }
  }
  
  class Branch {
    constructor(name) {
      this.name = name;
      this.customers = [];
    }
  
    getName() {
      return this.name;
    }
  
    getCustomers() {
      return this.customers;
    }
  
    addCustomer(customer) {
        let customerExist = !this.customers.some(cust => cust.getId() === customer.getId());
        if(customerExist) {
            this.customers.push(customer);
            return true;
        }else{
         return false;
    }
    }
    addCustomerTransaction(customerId, amount) {
      const customer = this.customers.find(cust => cust.getId() === customerId);
      if (customer) {
        return customer.addTransaction(amount);
      }
      return false;
    }
  }
  
  class Bank {
    constructor(name) {
      this.name = name;
      this.branches = [];
    }
  
    addBranch(branch) {
      const isBranchExisting = this.branches.some(existingBranch => existingBranch.getName() === branch.getName());

      if (!isBranchExisting) {
          this.branches.push(branch);
          return true;
      }
      
      return false;
      
    }
  
    addCustomer(branch, customer) {
      if (branch.addCustomer(customer)) {
        return true;
      }
      return false;
    }
    addCustomerTransactions(branch, customerId, amount) {
            if (this.branches.includes(branch)) {
              return branch.addCustomerTransaction(customerId, amount);
            }
            return false;
    }

    findBranchByName(branchName) {
      const matchedBranches = this.branches.filter(branch => branch.getName() === branchName);
      if (matchedBranches.length > 0) {
        return matchedBranches;
         
    }else{
        return null;
    }
   }
    checkBranch(branch) {
      if (this.branches.includes(branch)){
        return true
      }else {
        return false;
      }
    }
  
    listCustomers(branch, includeTransactions) {
        if (!this.branches.includes(branch)) {
            console.log("This branch not Exitst");
            return;
          }
      console.log(`Customers for Branch: ${branch.getName()}`);
      branch.getCustomers().forEach(customer => {
        console.log(`Customer: ${customer.getName()}`);
        if (includeTransactions) {
          console.log(`Transactions:`);
          customer.getTransactions().forEach(transaction => {
            console.log(`  Amount: ${transaction.amount}, Date: ${transaction.date}`);
          });
        }
      });
    }
  }
  
console.log("------------------ Example 1: -----------------\n");
console.log("------ Create a Bank and Branch --------\n");
const myBank = new Bank("My Bank");
const branchA = new Branch("Branch A");
console.log(myBank.addBranch(branchA)); 
console.log("------  Add Customers to a Branch --------\n");
const customer1 = new Customer("Alice", 101);
const customer2 = new Customer("Bob", 102);

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
const balance1 = customer1.getBalance(); // Get Alice's balance
const balance2 = customer2.getBalance(); // Get Bob's balance

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
const foundBranches = myBank.findBranchByName("Branch A"); // Find branches by name
console.log("Found Branches by Name:", foundBranches);

console.log("------  Check if a Branch Exists in the Bank : --------\n");
const branchExists = myBank.checkBranch(branchA); // Check if a branch exists in the bank
console.log("Branch A Exists in the Bank:", branchExists);

console.log("------------------------ Example 2 : ----------------------------------\n");
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer3 = new Customer("John", 1);
const customer4 = new Customer("Anna", 2);
const customer5 = new Customer("John", 3);

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




