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
      if (!this.customers.some(cust => cust.getId() === customer.getId())) {
        this.customers.push(customer);
        return true;
      }
      return false;
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
      if (!this.branches.some(b => b.getName() === branch.getName())) {
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
  
    addCustomerTransaction(branch, customerId, amount) {
      return branch.addCustomerTransaction(customerId, amount);
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
      return this.branches.includes(branch);
    }
  
    listCustomers(branch, includeTransactions) {
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
  
  
  const arizonaBank = new Bank("Arizona");
  const westBranch = new Branch("West Branch");
  const sunBranch = new Branch("Sun Branch");
  const customer1 = new Customer("John", 1);
  const customer2 = new Customer("Anna", 2);
  const customer3 = new Customer("John", 3);
  
  arizonaBank.addBranch(westBranch); 
  arizonaBank.addBranch(sunBranch);
  arizonaBank.addBranch(westBranch); 
  
  console.log(arizonaBank.findBranchByName("bank")); 
  console.log(arizonaBank.findBranchByName("Sun Branch")); 
  
  arizonaBank.addCustomer(westBranch, customer1);
  arizonaBank.addCustomer(westBranch, customer3); 
  arizonaBank.addCustomer(sunBranch, customer1); 
  arizonaBank.addCustomer(sunBranch, customer2);
  
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
  arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
  
  customer1.addTransaction(-1000); // null
  console.log(customer1.getBalance()); 
  
  arizonaBank.listCustomers(westBranch, true); 
  arizonaBank.listCustomers(sunBranch, true); 