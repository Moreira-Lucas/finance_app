const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount= document.querySelector('#amount');




const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'));
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : [];


const removeTransaction = ID =>{
transactions = transactions.filter(transaction => 
  transaction.id !== ID);

  updateLocalStorage();
  init();
}


const addTransactionIntoDOM = transaction =>{
  const operator = transaction.amount < 0 ? '-':'+';
  const cssClass = transaction.amount < 0 ? 'minus':'plus';
  const amountWithoutOperator = Math.abs(transaction.amount);


  const li = document.createElement('LI');

  li.classList.add(cssClass);

  li.innerHTML = 
  `
  ${transaction.name}
  <span>${operator} R$ ${amountWithoutOperator}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  
  `;

  transactionUl.appendChild(li);

  console.log(operator);  
  
  
}

const getExpenses = transactionAmount => Math.abs(transactionAmount
    .filter(value=> value<0)
    .reduce((accumulator, value)=> accumulator + value, 0))
    .toFixed(2);


const getIncome = transactionAmount =>
  transactionAmount
  .filter(value => value > 0)
  .reduce((accumulator, value)=> accumulator + value, 0)
  .toFixed(2);


const getTotal = transactionAmount =>
  transactionAmount
  .reduce((accumulator, transaction)=>accumulator + transaction, 0)
  .toFixed(2);




const updateBalanceValues = () =>{

const transactionAmount = transactions
.map(transaction =>transaction.amount);

const total = getTotal(transactionAmount);

const income = getIncome(transactionAmount);

const expenses = getExpenses(transactionAmount);
  
  balanceDisplay.textContent=`R$ ${total}`;
  incomeDisplay.textContent=`R$ ${income}`;
  expenseDisplay.textContent=`R$ ${expenses}`;

}

const init = () =>{
  transactionUl.innerHTML="";
  
  
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
}

init();


const updateLocalStorage = () =>{
  localStorage.setItem('transactions',JSON.stringify(transactions));
}



const generateId = () => Math.round(Math.random()*1000)



const addToTransactionsArray = (transactionName, transactionAmount) =>{
  transactions.push({
    id:generateId(), 
    name:transactionName, 
    amount: Number(transactionAmount)
  });
}


const cleanInputs = () =>{
  inputTransactionName.value= "";
  inputTransactionAmount.value= "";
}

const handleFormSubmit = e => {
  
    e.preventDefault();
    
  
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim() 
    const isSomeInputEmpty = transactionName === "" || transactionAmount === ""; 


    if(isSomeInputEmpty){
      alert('Por favor, preencha o nome e o valor da transação!');
      return
    }
  
    addToTransactionsArray(transactionName, transactionAmount);
    init();
    updateLocalStorage();
    cleanInputs();
    
  }



form.addEventListener('submit', handleFormSubmit);
