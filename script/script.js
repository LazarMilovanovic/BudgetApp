const income = document.getElementById("income");
const expense = document.getElementById("expense");
const amount = document.getElementById("transaction-amount");
const title = document.getElementById("transaction-title");
const date = document.getElementById("transaction-date");
const addTransaction = document.getElementById("add-transaction");
const transactionList = document.getElementById("transaction-list");
const transactionInfo = document.getElementById("transaction-info");
const bgDiv = document.getElementById("seasons-background");

////////////////////////
//Seasonal Background//
//////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const video = document.createElement("video");
  video.src = "images/video.mp4";
  video.controls = false;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.classList.add("main__bg-video");

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const today = month * 100 + day;

  if (today >= 320 && today < 621) {
    bgDiv.style.backgroundImage = `url("images/spring.jpg")`;
  } else if (today >= 621 && today < 923) {
    bgDiv.style.backgroundImage = `url("images/summer.jpg")`;
  } else if (today >= 923 && today < 1221) {
     // bgDiv.style.backgroundImage = `url("images/winter.jpg")`;
    bgDiv.replaceWith(video);
  } else {
    bgDiv.style.backgroundImage = `url("images/winter.jpg")`;
  }
});

income.addEventListener("click", () => {
  amount.style.backgroundColor = "var(--income-color)"; //green
});

expense.addEventListener("click", () => {
  amount.style.backgroundColor = "var(--expense-color)"; //red
});

function getTransactionClass() {
  if (income.checked) {
    return "income";
  } else if (expense.checked) {
    return "expense";
  }
}

function getTransactionType() {
  if (income.checked) {
    return income.value;
  } else if (expense.checked) {
    return expense.value;
  }
}

function formValidation() {
  if (!income.checked && !expense.checked) {
    alert("You didnt select transaction type");
    return false;
  } else if (amount.value <= 0 || amount.value === "") {
    alert("Amount is invalid");
    return false;
  } else if (title.value.trim() === "") {
    alert("You didnt enter a title");
    return false;
  } else if (date.value === "") {
    alert("You didn't enter a date");
    return false;
  } else {
    return true;
  }
}

const transactionArr = JSON.parse(localStorage.getItem("transactions")) || [];

document.addEventListener("DOMContentLoaded", () => {
  if (transactionArr.length >= 1) {
    displayTransactionInfo();
  }
});

/////////////////////////
//Display transactions//
///////////////////////
function showTransactions() {
  transactionArr.forEach((element) => {
    transactionList.innerHTML += `<div class="list-element ${element.transactionClass}" id="${element.id}">
  <p>${element.type}${element.amount}</p>
  <p>${element.title}</p>
  <p>${element.date}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;
  });
}
showTransactions();

////////////////////
//Add Transaction//
//////////////////
addTransaction.addEventListener("click", (e) => {
  e.preventDefault();
  if (!formValidation()) return;

  const transactionElement = {
    id: `${Date.now()}`,
    transactionClass: getTransactionClass(),
    type: getTransactionType(),
    amount: amount.value,
    title: title.value,
    date: date.value,
  };

  transactionList.innerHTML += `<div class="list-element ${getTransactionClass()}" id="${transactionElement.id}">
  <p>${getTransactionType()}${amount.value} </p>
  <p>${title.value}</p>
  <p>${date.value}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;

  income.checked = false;
  expense.checked = false;
  amount.value = "";
  amount.style.backgroundColor = "transparent";
  title.value = "";
  date.value = "";

  transactionArr.push(transactionElement);
  // console.log(transactionArr);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));
  displayTransactionInfo();
});

//////////////////////
//Edit Transactions//
////////////////////

function editTransaction(btnEl) {
  const transaction = btnEl.parentElement.parentElement;
  const transactionArrIndex = transactionArr.findIndex((el) => el.id === transaction.id);
  // console.log(transactionArrIndex);
  transaction.outerHTML = `<form action="" class="edit-form" id="edit-transaction" id="${transactionArr[transactionArrIndex].id}">
        <div class="edit-transactions">
          <div class="transactions__type">
            <label for="edit-plus-radio">&#43;</label>
            <input
              type="radio"
              id="edit-plus-radio"
              name="transaction-type"
              class="plus-radio"
              value="+"
              required
              ${transactionArr[transactionArrIndex].transactionClass === "income" ? "checked" : ""}
            />
            <label for="edit-minus-radio">&#8722;</label>
            <input
              type="radio"
              id="edit-minus-radio"
              name="transaction-type"
              class="minus-radio"
              value="-"
              required
              ${transactionArr[transactionArrIndex].transactionClass === "expense" ? "checked" : ""}
            />
          </div>
          <input
            type="number"
            name="transaction-amount"
            id="edit-amount-input"
            class="transactions__amount"
            required
            aria-label="amount"
            value="${transactionArr[transactionArrIndex].amount}"
          />
          <input
            type="text"
            name="transaction-title"
            placeholder="Category"
            id="edit-title-input"
            class="transactions__title"
            required
            aria-label="transactions title"  
            value='${transactionArr[transactionArrIndex].title}'
          />
          <input
            type="date"
            class="transactions__date"
            id="edit-date-input"
            name="transaction-date"
            required
            aria-label="date"
            value='${transactionArr[transactionArrIndex].date}'
          />
          <button type="button" class="save-edit" onclick="saveEdit()" aria-label="save edit">Save</button>
          <button type="button" class="cancel-edit" onclick="cancelEdit()" aria-label="cancel edit">Cancel</button>
        </div>
   </form>`;
}

//////////////
//Save Edit//
////////////
function saveEdit() {
  const saveTransction = document.getElementById("edit-transaction");
  const editIncome = document.getElementById("edit-plus-radio");
  const editExpense = document.getElementById("edit-minus-radio");
  const editAmount = document.getElementById("edit-amount-input");
  const editTitle = document.getElementById("edit-title-input");
  const editDate = document.getElementById("edit-date-input");

  function getEditTransactionClass() {
    if (editIncome.checked) {
      return "income";
    } else if (editExpense.checked) {
      return "expense";
    }
  }

  function getEditTransactionType() {
    if (editIncome.checked) {
      return editIncome.value;
    } else if (editExpense.checked) {
      return editExpense.value;
    }
  }

  function editFormValidation() {
    if (!editIncome.checked && !editExpense.checked) {
      alert("You didnt select transaction type");
      return false;
    } else if (editAmount.value <= 0 || editAmount.value === "") {
      alert("Amount is invalid");
      return false;
    } else if (editTitle.value.trim() === "") {
      alert("You didnt enter a title");
      return false;
    } else if (editDate.value === "") {
      alert("You didn't enter a date");
      return false;
    } else {
      return true;
    }
  }
  if (!editFormValidation()) return;

  const editedTransaction = {
    id: saveTransction.id,
    transactionClass: getEditTransactionClass(),
    type: getEditTransactionType(),
    amount: editAmount.value,
    title: editTitle.value,
    date: editDate.value,
  };

  const transactionArrIndex = transactionArr.findIndex((el) => el.id === saveTransction.id);
  transactionArr.splice(transactionArrIndex, 1, editedTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));

  saveTransction.outerHTML = `<div class="list-element ${getEditTransactionClass()}" id="${editedTransaction.id}">
  <p>${getEditTransactionType()}${editAmount.value}</p>
  <p>${editTitle.value}</p>
  <p>${editDate.value}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;

  displayTransactionInfo();
}

////////////////
//Cancel edit//
//////////////
function cancelEdit() {
  transactionList.innerHTML = "";
  showTransactions();
}

///////////////////////
//Delete Transaction//
/////////////////////
function deleteTransaction(btnEl) {
  const transaction = btnEl.parentElement.parentElement;
  const transactionArrIndex = transactionArr.findIndex((el) => el.id === transaction.id);
  transaction.remove();
  transactionArr.splice(transactionArrIndex, 1);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));

  if (transactionArr.length === 0) {
    transactionInfo.innerHTML = "";
  }
  displayTransactionInfo();
}

/////////////////////
//Transaction Info//
///////////////////
function displayTransactionInfo() {
  if (transactionArr.length === 0) {
    transactionInfo.innerHTML = "";
    return;
  }
  transactionInfo.innerHTML = `
  <span class="info-options">
  <button type="button" class="chart" onclick="showAndHideChart()" aria-label='show or hide chart'></button>
  <select class="sort-transactions" name="sort-transactions" id="sort-transactions" onchange='sortTransactions()' aria-label="Sort transactions">
  <option value="" disabled selected hidden>Chose sort option</options>
  <option value="original">Original List</option>
  <option value="incomes">Income</option>
  <option value="expenses">Expenses</option>
  <option value="category">By Category</option>
  
</select>
  <button type="button" class="clear-transactions" onclick="clearTransactions()" aria-label='Clear transactions button'></button>
  </span>
  <div class="transaction-canculations">
  <p>Income:<strong>${totalIncome()}</strong></p>
  <p>Expense:<strong>${totalExpenses()}</strong></p>
  <p>Budget:<strong>${totalIncome() - totalExpenses()}</strong></p>
  <p>Expenses = <strong>${precentageSpent()}%</strong> of income</p>
  </div>`;
}

function clearTransactions() {
  localStorage.removeItem("transactions");
  transactionList.innerHTML = "Transactions:";
  transactionInfo.innerHTML = "";
  transactionArr.length = 0;
}

function totalIncome() {
  let totalIncome = 0;
  for (let el of transactionArr) {
    if (el.transactionClass === "income") {
      totalIncome += Number(el.amount);
    }
  }
  return totalIncome;
}

function totalExpenses() {
  let totalExpenses = 0;
  for (let el of transactionArr) {
    if (el.transactionClass === "expense") {
      totalExpenses += Number(el.amount);
    }
  }
  return totalExpenses;
}
function precentageSpent() {
  return ((100 * totalExpenses()) / totalIncome()).toFixed(2);
}

///////////////////////
//Chart JS Functions//
/////////////////////
let toggle = true;
function showAndHideChart() {
  if (toggle) {
    showChart();
  } else {
    hideChart();
  }
  toggle = !toggle;
}

function budgetProgress() {
  const budget = [];
  for (let i = 0; i < transactionArr.length; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += Number(transactionArr[j].type + transactionArr[j].amount);
    }
    budget.push(sum);
  }
  return budget;
}

function showChart() {
  transactionList.innerHTML = `<canvas id='transactions-chart'></canvas>`;
  const ctx = document.getElementById("transactions-chart").getContext("2d");
  const transactionChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: transactionArr.map((transaction) => transaction.date.split("-").splice(1, 2).join("-")),
      datasets: [
        {
          label: "Transactions",
          data: budgetProgress(),
          borderColor: "rgba(4, 0, 255, 1)",
          borderWidth: 1,
          pointStyle: "rectRot",
          pointRadius: 5,
        },
      ],
    },
  });
}

function hideChart() {
  transactionList.firstElementChild.remove();
  showTransactions();
}

//////////////////////
//Sort Transactions//
////////////////////
function sortTransactions() {
  console.log(document.getElementById("sort-transactions").value);
  const selectValue = document.getElementById("sort-transactions").value;
  if (selectValue === "original") {
    transactionList.innerHTML = "";
    showTransactions();
    // console.log(transactionArr);
  } else if (selectValue === "incomes") {
    showIncomes();
  } else if (selectValue === "expenses") {
    showExpenses();
  } else if (selectValue === "category") {
    sortByCategory();
  }
}

function showIncomes() {
  const allIncomes = transactionArr.filter((element) => element.type === "+");
  // console.log(allIncomes);
  transactionList.innerHTML = "";
  allIncomes.forEach((element) => {
    transactionList.innerHTML += `<div class="list-element ${element.transactionClass}" id="${element.id}">
  <p>${element.type}${element.amount}</p>
  <p>${element.title}</p>
  <p>${element.date}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;
  });
}

function showExpenses() {
  const allExpenses = transactionArr.filter((el) => el.type === "-");
  // console.log(allExpenses);
  transactionList.innerHTML = "";
  allExpenses.forEach((element) => {
    transactionList.innerHTML += `<div class="list-element ${element.transactionClass}" id="${element.id}">
  <p>${element.type}${element.amount}</p>
  <p>${element.title}</p>
  <p>${element.date}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;
  });
}

function sortByCategory() {
  const sortArr = [...transactionArr];
  // console.log(sortArr);
  // console.log(transactionArr);
  const sortByCategory = sortArr.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  // console.log(sortByCategory);
  transactionList.innerHTML = "";
  sortByCategory.forEach((element) => {
    transactionList.innerHTML += `<div class="list-element ${element.transactionClass}" id="${element.id}">
  <p>${element.type}${element.amount}</p>
  <p>${element.title}</p>
  <p>${element.date}</p>
  <div class="edit-delete">
  <button class="edit" type="button" onclick="editTransaction(this)" aria-label="Edit Button"></button>
  <button class="delete"type="button" onclick="deleteTransaction(this)" aria-label="Delete Button"></button>
  </div>
  </div>`;
  });
  // console.log(transactionArr);
}
// console.log(transactionArr);







