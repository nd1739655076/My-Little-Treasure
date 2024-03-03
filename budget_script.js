document.addEventListener('DOMContentLoaded', function() {
    const totalAmountButton = document.getElementById("total-amount-button");
    const checkAmountButton = document.getElementById("check-amount");
    const totalAmountInput = document.getElementById("total-amount");
    const userAmountInput = document.getElementById("user-amount");
    const productTitleInput = document.getElementById("product-title");
    const amountDisplay = document.getElementById("amount");
    const expenditureValueDisplay = document.getElementById("expenditure-value");
    const balanceAmountDisplay = document.getElementById("balance-amount");

    // Initialize from localStorage
    function initialize() {
        let data = localStorage.getItem('budgetData');
        if (data) {
            data = JSON.parse(data);
            amountDisplay.textContent = data.budget || 0;
            expenditureValueDisplay.textContent = data.expense || 0;
            balanceAmountDisplay.textContent = data.balance || data.budget || 0;
        }
    }

    // Update localStorage data
    function updateStorage(key, value) {
        let data = localStorage.getItem('budgetData');
        data = data ? JSON.parse(data) : {};
        data[key] = value;
        localStorage.setItem('budgetData', JSON.stringify(data));
    }

    // Set Budget
    totalAmountButton.addEventListener("click", function() {
        const totalAmount = parseFloat(totalAmountInput.value);
        if (!isNaN(totalAmount) && totalAmount > 0) {
            updateStorage('budget', totalAmount);
            updateStorage('balance', totalAmount - (parseFloat(expenditureValueDisplay.textContent) || 0));
            initialize(); // Refresh display
            totalAmountInput.value = ''; // Clear input
        }
    });

    // Add Expense
    checkAmountButton.addEventListener("click", function() {
        const userAmount = parseFloat(userAmountInput.value);
        const productTitle = productTitleInput.value.trim();
        if (!isNaN(userAmount) && userAmount > 0 && productTitle) {
            let expense = parseFloat(expenditureValueDisplay.textContent) || 0;
            expense += userAmount;
            updateStorage('expense', expense);
            let budget = parseFloat(amountDisplay.textContent) || 0;
            updateStorage('balance', budget - expense);
            initialize(); // Refresh display
            userAmountInput.value = ''; // Clear input
            productTitleInput.value = ''; // Clear input
        }
    });

    // Initial load
    initialize();
});
