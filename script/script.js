const income = document.getElementById("income");
const expense = document.getElementById("expense");
const amount = document.getElementById("transaction-amount");
const title = document.getElementById("transaction-title");
const date = document.getElementById("transaction-date");
const addTransaction = document.getElementById("add-transaction");
const transactionList = document.getElementById("transaction-list");
const transactionInfo = document.getElementById("transaction-info");
const bgDiv = document.getElementById("seasons-background"); //Backgroung
const video = document.getElementById("bg-video"); //Background
const transactionFrom = document.getElementById("transaction-form");

const transactionArr = JSON.parse(localStorage.getItem("transactions")) || [];

////////////////////////
//Seasonal Background//
//////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  let today = dayOfYear(new Date());

  video.classList.remove("show-video");
  video.classList.add("hide-video");

  if (today >= 79 && today < 172) {
    bgDiv.style.backgroundImage = `url("images/spring.jpg")`;
  } else if (today >= 172 && today < 266) {
    bgDiv.style.backgroundImage = `url("images/summer.jpg")`;
  } else if (today >= 266 && today < 355) {
    video.classList.remove("hide-video");
    video.classList.add("show-video");
  } else {
    bgDiv.style.backgroundImage = `url("images/winter.jpg")`;
  }
  // Show Transaction Info
  if (transactionArr.length >= 1) {
    displayTransactionInfo();
  }
});

income.onclick = () => {
  amount.classList.remove("expense"); //red
  amount.classList.add("income", "amount-text"); //green bg and placeholder text white
};

expense.onclick = () => {
  amount.classList.remove("income"); //green
  amount.classList.add("expense", "amount-text"); //red bg and placeholder text white
};

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
  const today = new Date();
  const todayDateStr = today.toISOString().split("T")[0];
  const todayDate = new Date(todayDateStr);
  const inputDate = new Date(date.value);
  const containsNumber = /\d/;
  const inputTitle = title.value.trim();

  if (!income.checked && !expense.checked) {
    alert("You didnt select transaction type");
    return false;
  } else if (amount.value <= 0 || amount.value === "" || amount.value.length > 10 || amount.value % 1 !== 0) {
    alert("Invalida Amount");
    return false;
  } else if (inputTitle === "" || inputTitle.length > 15 || containsNumber.test(inputTitle)) {
    alert("Invalid Title");
    return false;
  } else if (date.value === "" || inputDate > todayDate || inputDate.getFullYear() < 2000) {
    alert("Invalid date");
    return false;
  } else {
    return true;
  }
}

////////////////////////
// Create DOM Element//
//////////////////////
const createDomElement = ({ elementTag, elClassName, elId, elTextContent, elementTitle, elType, elSetAttValue }) => {
  const element = document.createElement(elementTag);
  element.className = elClassName;
  element.id = elId;
  element.textContent = elTextContent;
  element.title = elementTitle;
  element.type = elType;
  element.setAttribute("aria-label", elSetAttValue);
  return element;
};

//////////////////////
//Create transaction//
/////////////////////
function createTransaction(element) {
  const li = createDomElement({
    elementTag: "li",
    elClassName: `list-element ${element.transactionClass}`,
    elId: element.id,
  });
  const typeAmount = createDomElement({
    elementTag: "p",
    elClassName: "type-amount",
    elTextContent: `${element.type}${element.amount}`,
  });
  const transactionTitle = createDomElement({
    elementTag: "p",
    elClassName: "title-text",
    elTextContent: `${element.title}`,
  });
  const transactionDate = createDomElement({
    elementTag: "p",
    elTextContent: `${element.date}`,
  });
  const editDelete = createDomElement({ elementTag: "div", elClassName: "edit-delete" });
  const editBtn = createDomElement({
    elementTag: "button",
    elClassName: "edit",
    elementTitle: "Edit Transaction",
    elType: "button",
    elSetAttValue: "Edit Button",
  });
  editBtn.onclick = () => editTransaction(editBtn);
  const deleteBtn = createDomElement({
    elementTag: "button",
    elClassName: "delete",
    elementTitle: "Delete transaction",
    elType: "button",
    elSetAttValue: "Delete Button",
  });
  deleteBtn.onclick = () => deleteTransaction(deleteBtn);
  editDelete.append(editBtn, deleteBtn);
  li.append(typeAmount, transactionTitle, transactionDate, editDelete);

  return li;
}

/////////////////////////
//Display transactions//
///////////////////////
function showTransactions() {
  transactionArr.forEach((element) => transactionList.appendChild(createTransaction(element)));
}
showTransactions();

////////////////////
//Add Transaction//
//////////////////
addTransaction.onclick = (e) => {
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

  const li = createDomElement({
    elementTag: "li",
    elClassName: `list-element ${transactionElement.transactionClass}`,
    elId: `${transactionElement.id}`,
  });
  const typeAmount = createDomElement({
    elementTag: "p",
    elClassName: "type-amount",
    elTextContent: `${transactionElement.type}${transactionElement.amount}`,
  });
  const transactionTitle = createDomElement({
    elementTag: "p",
    elClassName: "title-text",
    elTextContent: `${transactionElement.title}`,
  });
  const transactionDate = createDomElement({
    elementTag: "p",
    elTextContent: `${transactionElement.date}`,
  });
  const editDelete = createDomElement({ elementTag: "div", elClassName: "edit-delete" });
  const editBtn = createDomElement({
    elementTag: "button",
    elClassName: "edit",
    elementTitle: "Edit Transaction",
    elType: "button",

    elSetAttValue: "Edit Button",
  });
  editBtn.onclick = () => editTransaction(editBtn);
  const deleteBtn = createDomElement({
    elementTag: "button",
    elClassName: "delete",
    elementTitle: "Delete transaction",
    elType: "button",

    elSetAttValue: "Delete Button",
  });
  deleteBtn.onclick = () => deleteTransaction(deleteBtn);

  editDelete.append(editBtn, deleteBtn);
  li.append(typeAmount, transactionTitle, transactionDate, editDelete);
  transactionList.appendChild(li);

  income.checked = false;
  expense.checked = false;
  amount.value = "";
  amount.classList.remove("income", "expense");
  title.value = "";
  date.value = "";
  amount.classList.remove("amount-text");

  transactionArr.push(transactionElement);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));
  displayTransactionInfo();
};

//////////////////////////////
// Create Edit Form Element//
////////////////////////////

const createFormElement = ({ elementTag, elClassName, elId, elTextContent, elType, elName, elValue, elSetForAtt, elRequired, elPlaceholder }) => {
  const element = document.createElement(elementTag);
  element.className = elClassName;
  element.id = elId;
  element.textContent = elTextContent;
  element.type = elType;
  element.name = elName;
  element.value = elValue;
  element.setAttribute("for", elSetForAtt);
  element.required = elRequired;
  element.placeholder = elPlaceholder;
  return element;
};

//////////////////////
//Edit Transactions//
////////////////////
function editTransaction(btnEl) {
  const transaction = btnEl.closest("li");
  const transactionArrIndex = transactionArr.findIndex((el) => el.id === transaction.id);
  const data = transactionArr[transactionArrIndex];

  const form = createFormElement({
    elementTag: "form",
    elClassName: "edit-form",
    elId: `edit-${data.id}`,
  });
  const fromElements = createFormElement({
    elementTag: "div",
    elClassName: "edit-transactions",
  });
  const typeDiv = createFormElement({
    elementTag: "div",
    elClassName: "transactions__type",
  });

  const plusLabel = createFormElement({
    elementTag: "label",
    elTextContent: "+",
    elSetForAtt: "edit-plus-radio",
  });

  const plusInput = createFormElement({
    elementTag: "input",
    elId: "edit-plus-radio",
    elType: "radio",
    elName: "transaction-type",
    elValue: "+",
    elRequired: true,
  });
  if (data.transactionClass === "income") plusInput.checked = true;

  const minusLabel = createFormElement({
    elementTag: "label",
    elTextContent: "\u2212",
    elSetForAtt: "edit-minus-radio",
  });

  const minusInput = createFormElement({
    elementTag: "input",
    elId: "edit-minus-radio",
    elType: "radio",
    elName: "transaction-type",
    elValue: "-",
    elRequired: true,
  });
  if (data.transactionClass === "expense") minusInput.checked = true;

  typeDiv.append(plusLabel, plusInput, minusLabel, minusInput);

  const amountInput = createFormElement({
    elementTag: "input",
    elClassName: "transactions__amount",
    elId: "edit-amount-input",
    elType: "number",
    elName: "transaction-amount",
    elValue: data.amount,
    elRequired: true,
  });
  const titleInput = createFormElement({
    elementTag: "input",
    elClassName: "transactions__title",
    elId: "edit-title-input",
    elType: "text",
    elName: "transaction-title",
    elValue: data.title,
    elRequired: true,
  });
  const dateInput = createFormElement({
    elementTag: "input",
    elClassName: "transactions__date",
    elId: "edit-date-input",
    elType: "date",
    elName: "transaction-date",
    elValue: data.date,
    elRequired: true,
  });
  const saveBtn = createFormElement({
    elementTag: "button",
    elClassName: "edit-delete-btn",
    elTextContent: "Save",
    elType: "button",
  });
  saveBtn.onclick = () => saveEdit(transaction.id);

  const cancelBtn = createFormElement({
    elementTag: "button",
    elClassName: "edit-delete-btn",
    elTextContent: "Cancel",
    elType: "button",
  });
  cancelBtn.onclick = () => cancelEdit(transaction.id);

  fromElements.append(typeDiv, amountInput, titleInput, dateInput, saveBtn, cancelBtn);
  form.append(fromElements);
  transaction.replaceWith(form);
}

//////////////
//Save Edit//
////////////
function saveEdit(transactionId) {
  const form = document.getElementById(`edit-${transactionId}`);
  const editIncome = document.getElementById("edit-plus-radio");
  const editExpense = document.getElementById("edit-minus-radio");
  const editAmount = document.getElementById("edit-amount-input");
  const editTitle = document.getElementById("edit-title-input");
  const editDate = document.getElementById("edit-date-input");

  // Validacija forme
  function editFormValidation() {
    const today = new Date();
    const todayDateStr = today.toISOString().split("T")[0];
    const todayDate = new Date(todayDateStr);
    const inputEditedDate = new Date(editDate.value);
    const containsNumber = /\d/;
    const inputTitle = editTitle.value.trim();

    if (!editIncome.checked && !editExpense.checked) {
      alert("You didn't select transaction type");
      return false;
    } else if (editAmount.value <= 0 || editAmount.value === "" || editAmount.value.length > 10) {
      alert("Invalid Amount");
      return false;
    } else if (editTitle.value.trim() === "" || editTitle.value.length > 15 || containsNumber.test(inputTitle)) {
      alert("Invalid Title");
      return false;
    } else if (editDate.value === "" || inputEditedDate > todayDate) {
      alert("Invalid date");
      return false;
    }
    return true;
  }

  if (!editFormValidation()) return;

  const editedTransaction = {
    id: transactionId,
    transactionClass: editIncome.checked ? "income" : "expense",
    type: editIncome.checked ? "+" : "-",
    amount: editAmount.value,
    title: editTitle.value,
    date: editDate.value,
  };

  const transactionArrIndex = transactionArr.findIndex((el) => el.id === transactionId);
  transactionArr.splice(transactionArrIndex, 1, editedTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactionArr));

  const li = createDomElement({
    elementTag: "li",
    elClassName: `list-element ${editedTransaction.transactionClass}`,
    elId: `${editedTransaction.id}`,
  });
  const typeAmount = createDomElement({
    elementTag: "p",
    elClassName: "type-amount",
    elTextContent: `${editedTransaction.type}${editedTransaction.amount}`,
  });
  const transactionTitle = createDomElement({
    elementTag: "p",
    elClassName: "title-text",
    elTextContent: `${editedTransaction.title}`,
  });
  const transactionDate = createDomElement({
    elementTag: "p",
    elTextContent: `${editedTransaction.date}`,
  });
  const editDelete = createDomElement({
    elementTag: "div",
    elClassName: "edit-delete",
  });
  const editBtn = createDomElement({
    elementTag: "button",
    elClassName: "edit",
    elementTitle: "Edit Transaction",
    elType: "button",

    elSetAttValue: "Edit Button",
  });
  editBtn.onclick = () => editTransaction(editBtn);

  const deleteBtn = createDomElement({
    elementTag: "button",
    elClassName: "delete",
    elementTitle: "Delete transaction",
    elType: "button",

    elSetAttValue: "Delete Button",
  });
  deleteBtn.onclick = () => deleteTransaction(deleteBtn);

  editDelete.append(editBtn, deleteBtn);
  li.append(typeAmount, transactionTitle, transactionDate, editDelete);
  form.replaceWith(li);
  displayTransactionInfo();
}

////////////////
//Cancel edit//
//////////////
function cancelEdit() {
  transactionList.textContent = "Transactions:";
  showTransactions();
}

///////////////////////
//Delete Transaction//
/////////////////////
function deleteTransaction(btnEl) {
  const transaction = btnEl.closest(".list-element");
  transaction.classList.add("delete-question");
  transaction.textContent = "Do you want to delete this transaction?";

  const yesBtn = createDomElement({
    elementTag: "button",
    elClassName: "edit-delete-btn",
    elTextContent: "Yes",
    elType: "button",
    elSetAttValue: "Delete transactions",
  });
  yesBtn.onclick = () => {
    const transactionArrIndex = transactionArr.findIndex((el) => el.id === transaction.id);
    transaction.remove();
    transactionArr.splice(transactionArrIndex, 1);
    localStorage.setItem("transactions", JSON.stringify(transactionArr));
    displayTransactionInfo();
  };
  const noBtn = createDomElement({
    elementTag: "button",
    elClassName: "edit-delete-btn",
    elTextContent: "No",
    elType: "button",
    elSetAttValue: "Cancel detele",
  });
  noBtn.onclick = () => {
    transactionList.textContent = "Transactions:";
    showTransactions();
  };
  transaction.append(yesBtn, noBtn);

  if (transactionArr.length === 0) {
    transactionInfo.textContent = "";
  }
}

/////////////////////
//Transaction Info//
///////////////////
function displayTransactionInfo() {
  if (transactionArr.length === 0) {
    transactionInfo.textContent = "";
    return;
  }
  transactionInfo.textContent = "";

  const infoOptions = createDomElement({
    elementTag: "div",
    elClassName: "info-options",
  });

  const chartBtn = createDomElement({
    elementTag: "button",
    elClassName: "chart",
    elType: "button",
    elSetAttValue: "Show or Hide Chart",
  });
  chartBtn.onclick = () => showAndHideChart();
  chartBtn.setAttribute("title", "Budget chart");

  const sortSelect = createDomElement({
    elementTag: "select",
    elClassName: "sort-transactions",
    elId: "sort-transactions",
    elSetAttValue: "Sort transactions",
  });
  sortSelect.name = "sort-transactions";
  sortSelect.setAttribute("onchange", "sortTransactions()");

  const options = [
    { value: "", text: "Chose sort option", disabled: true, selected: true, hidden: true },
    { value: "original", text: "Original List" },
    { value: "incomes", text: "Income" },
    { value: "expenses", text: "Expenses" },
    { value: "category", text: "By Category" },
  ];

  options.forEach((optData) => {
    const option = document.createElement("option");
    option.value = optData.value;
    option.textContent = optData.text;
    if (optData.disabled) option.disabled = true;
    if (optData.selected) option.selected = true;
    if (optData.hidden) option.hidden = true;
    sortSelect.appendChild(option);
  });

  const clearBtn = createDomElement({
    elementTag: "button",
    elClassName: "clear-transactions clear-btn-hover",
    elId: "clear-transactions",
    elType: "button",
    elSetAttValue: "Clear transactions button",
  });
  clearBtn.onclick = () => clearTransactions();
  clearBtn.setAttribute("title", "Delete all transactions");

  infoOptions.append(chartBtn, sortSelect, clearBtn);

  const transactionCalculationsDiv = createDomElement({
    elementTag: "div",
    elClassName: "transaction-canculations",
  });

  const infoData = [
    { text: "Income:", value: totalIncome() },
    { text: "Expense:", value: totalExpenses() },
    { text: "Budget:", value: totalIncome() - totalExpenses() },
    { text: `Expenses = ${precentageSpent()}% of income` },
  ];

  infoData.forEach((info) => {
    const p = document.createElement("p");
    p.textContent = info.text;

    const strong = document.createElement("strong");
    strong.textContent = info.value;

    p.appendChild(strong);
    transactionCalculationsDiv.appendChild(p);
  });

  transactionInfo.append(infoOptions, transactionCalculationsDiv);
}

function clearTransactions() {
  localStorage.removeItem("transactions");
  transactionList.textContent = "Transactions:";
  transactionInfo.textContent = "";
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
  const chronologicalArr = [...transactionArr].sort((a, b) => new Date(a.date) - new Date(b.date));
  const budget = [];
  for (let i = 0; i < chronologicalArr.length; i++) {
    let sum = 0;
    for (let j = 0; j <= i; j++) {
      sum += Number(chronologicalArr[j].type + chronologicalArr[j].amount);
    }
    budget.push(sum);
  }
  return budget;
}

function showChart() {
  const chronologicalArr = [...transactionArr].sort((a, b) => new Date(a.date) - new Date(b.date));
  const budgetArr = budgetProgress();

  const sortSelect = document.getElementById("sort-transactions");
  sortSelect.disabled = true;
  const clearBtn = document.getElementById("clear-transactions");
  clearBtn.disabled = true;
  clearBtn.classList.remove("clear-btn-hover");
  transactionFrom.classList.remove("show-transaction-form");
  transactionFrom.classList.add("hide-transaction-form");

  transactionList.textContent = "";
  const canvas = document.createElement("canvas");
  canvas.id = "transactions-chart";
  transactionList.appendChild(canvas);
  const ctx = document.getElementById("transactions-chart").getContext("2d");
  const transactionChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chronologicalArr.map((transaction) => transaction.date.split("-").splice(0, 2).join("-")), //year and date
      datasets: [
        {
          label: "Transactions",
          data: budgetProgress(),
          borderWidth: 3,
          pointStyle: "circle",
          pointRadius: 4,
          pointHoverRadius: 6,
          segment: {
            borderColor: (ctx) => {
              const i = ctx.p0DataIndex;
              return budgetArr[i] < budgetArr[i + 1] ? "rgb(98, 215, 87)" : "rgb(255, 57, 57)"; //Green(First) and Red(Second)
            },
          },
        },
      ],
    },
  });
}

function hideChart() {
  const sortSelect = document.getElementById("sort-transactions");
  sortSelect.disabled = false;
  const clearBtn = document.getElementById("clear-transactions");
  clearBtn.disabled = false;
  clearBtn.classList.add("clear-btn-hover");
  transactionFrom.classList.remove("hide-transaction-form");
  transactionFrom.classList.add("show-transaction-form");
  transactionList.firstElementChild.remove();
  transactionList.textContent = "Transactions:";
  showTransactions();
}

//////////////////////
//Sort Transactions//
////////////////////
function sortTransactions() {
  const selectValue = document.getElementById("sort-transactions").value;
  if (selectValue === "original") {
    transactionList.textContent = "";
    showTransactions();
  } else if (selectValue === "incomes") {
    showIncomes();
  } else if (selectValue === "expenses") {
    showExpenses();
  } else if (selectValue === "category") {
    sortByCategory();
  }
}

function showIncomes() {
  transactionList.textContent = "Transactions:";
  const allIncomes = transactionArr.filter((element) => element.type === "+");
  const allIncomesByValue = allIncomes.sort((a, b) => b.amount - a.amount);
  const allExpenses = transactionArr.filter((el) => el.type === "-");
  const allExpensesByValue = allExpenses.sort((a, b) => a.amount - b.amount);
  const maxToMin = [...allIncomesByValue, ...allExpensesByValue];
  maxToMin.forEach((element) => transactionList.appendChild(createTransaction(element)));
}

function showExpenses() {
  transactionList.textContent = "Transactions:";
  const allIncomes = transactionArr.filter((element) => element.type === "+");
  const allIncomesByValue = allIncomes.sort((a, b) => a.amount - b.amount);
  const allExpenses = transactionArr.filter((el) => el.type === "-");
  const allExpensesByValue = allExpenses.sort((a, b) => b.amount - a.amount);
  const minToMax = [...allExpensesByValue, ...allIncomesByValue];
  minToMax.forEach((element) => transactionList.appendChild(createTransaction(element)));
}

function sortByCategory() {
  const sortArr = [...transactionArr];
  const sortByCategory = sortArr.sort((a, b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
    if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
    return 0;
  });
  transactionList.textContent = "Transactions:";
  sortByCategory.forEach((element) => transactionList.appendChild(createTransaction(element)));
}
