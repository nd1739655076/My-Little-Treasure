document.addEventListener('DOMContentLoaded', () => {
    // Load saved data on page load
    loadUserData();
});

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    amount.innerText = userData.budget || '0';
    expenditureValue.innerText = userData.expense || '0';
    balanceValue.innerText = (userData.budget - userData.expense) || '0';
}

function saveUserData(budget, expense) {
    const balance = budget - expense;
    const userData = { budget, expense, balance };
    localStorage.setItem('userData', JSON.stringify(userData));
    loadUserData(); // Refresh display
}

// Set Budget
totalAmountButton.addEventListener("click", () => {
    const tempAmount = parseFloat(totalAmount.value);
    if (isNaN(tempAmount) || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        const currentExpense = parseFloat(expenditureValue.innerText) || 0;
        saveUserData(tempAmount, currentExpense);
        totalAmount.value = ""; // Clear input box
    }
});

// Add Expense
checkAmountButton.addEventListener("click", () => {
    const expense = parseFloat(userAmount.value);
    if (isNaN(expense) || !productTitle.value.trim()) {
        productTitleError.classList.remove("hide");
    } else {
        productTitleError.classList.add("hide");
        const currentBudget = parseFloat(amount.innerText) || 0;
        const currentExpense = parseFloat(expenditureValue.innerText) || 0 + expense;
        saveUserData(currentBudget, currentExpense);
        productTitle.value = "";
        userAmount.value = ""; // Empty inputs
    }
});
