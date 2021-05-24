// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const reco = document.getElementById('reco');

const TransactionDataAll = [
   { id: 1, customername: 'Mary', bank: '74628', deposit: 689070.08, loan: 1674587.01 },
   { id: 2, customername: 'Tom', bank: '41881', deposit: 42250.59, loan: 934739.87 },
   { id: 3, customername: 'Kate', bank: '16089', deposit: 419921.30, loan: 4991080.91 },
   { id: 4, customername: 'David', bank: '1189', deposit: 722932.74, loan: 4694609.64 },
   { id: 5, customername: 'Owen', bank: '58466', deposit: 61558.14, loan: 1348816.01 }

  ];

 var TransactionData = null;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const deposit_item = document.createElement('li');

  deposit_item.classList.add('plus');
  deposit_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> $ ${Math.abs(
    transaction.deposit)+Math.abs(transaction.loan)}</span> 
  `;

  list.appendChild(deposit_item);
/*
  const loan_item = document.createElement('li');

  loan_item.classList.add('minus');
  loan_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    transaction.loan  
  )}</span> 
  `;

  list.appendChild(loan_item);
  */
}


// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(0);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(0);
  const bal = total_deposit - (-total_loan);
    balance.innerText = `$${bal}`;
    money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 2000000)? "Your retirement plan is on track": "Your retirement plan MAY NOT be on track";
}

function init() {
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername == custname.value);  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

init();
form.addEventListener('submit', filterTransaction);
