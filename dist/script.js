const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");
const cancelElement = document.getElementById("cancel-svg");
const blurElement = document.getElementById("edit-overlay");
const editFormElement = document.getElementById("edit-form");

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses in tabular form
function renderExpenses() {
  // Clear expense list
  expenseList.innerHTML = "";

  // Initialize total amount
  let totalAmount = 0;

  // Loop through expenses array and create table rows
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const expenseRow = document.createElement("tr");
    expenseRow.innerHTML = ` 
	<td class="bg-white p-2">${expense.name}</td>
    <td class="bg-white p-2">$${expense.amount}</td>
    <td class="delete-btn w-0 cursor-pointer bg-white p-2 text-red-600 underline" data-id="delete${i}">Delete</td>
    <td class="edit-btn cursor-pointer bg-white text-gray-400 underline" data-id="edit${i}">Edit</td>
	`;
    expenseList.appendChild(expenseRow);

    // Update total amount
    totalAmount += expense.amount;
  }

  // Update total amount display
  totalAmountElement.textContent = totalAmount.toFixed(2);

  // Save expenses to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// When clicking cancel button
function back() {
  blurElement.style.visibility = "hidden";
  editFormElement.style.visibility = "hidden";
}

// Function to add expense
function addExpense(event) {
  console.log("HEllo");
  event.preventDefault();

  // Get expense name and amount from form
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");

  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  // Clear form inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  // Validate inputs
  if (expenseName === "" || isNaN(expenseAmount)) {
    alert("Please enter valid expense details.");
    return;
  }

  // Create new expense object
  const expense = {
    name: expenseName,
    amount: expenseAmount,
  };

  // Add expense to expenses array
  expenses.push(expense);

  // Render expenses
  renderExpenses();
}

// Function to handle action like delete and edit
function handleExpenseActions(event) {
  const target = event.target;

  // Handle edit function
  if (target.classList.contains("edit-btn")) {
    const expenseIndex = parseInt(
      target.getAttribute("data-id").replace("edit", ""),
    );
    const expense = expenses[expenseIndex];

    const editNameInput = document.getElementById("edit-name");
    const editAmountInput = document.getElementById("edit-amount");
    const nameElement = document.getElementById("name");

    editNameInput.value = expense.name;
    editAmountInput.value = expense.amount;

    editFormElement.setAttribute("data-index", expenseIndex); // Store the index for later use
    editFormElement.style.visibility = "visible";
    blurElement.style.visibility = "visible";
    nameElement.textContent = `Editing ${expense.name}`;
  }
  // Handle delete function
  else if (target.classList.contains("delete-btn")) {
    const expenseIndex = parseInt(
      target.getAttribute("data-id").replace("delete", ""),
    );
    expenses.splice(expenseIndex, 1);
    renderExpenses();
  }
}

// Function to edit expense
function editExpense(event) {
  event.preventDefault();
  const expenseIndex = parseInt(editFormElement.getAttribute("data-index"));
  const newName = document.getElementById("edit-name").value;
  const newAmount = parseFloat(document.getElementById("edit-amount").value);

  if (isNaN(newAmount) || newName.trim() === "") {
    alert("Please enter valid expense details.");
    return;
  }

  expenses[expenseIndex].name = newName;
  expenses[expenseIndex].amount = newAmount;

  // Clear form inputs
  document.getElementById("edit-name").value = "";
  document.getElementById("edit-amount").value = "";

  back();

  renderExpenses();
}

// Add event listeners
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", handleExpenseActions);
cancelElement.addEventListener("click", back);
editFormElement.addEventListener("submit", editExpense);

// Render initial expenses on page load
renderExpenses();
