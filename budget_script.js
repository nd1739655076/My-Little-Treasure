const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
console.log("passed username="+username);
document.addEventListener('DOMContentLoaded', function() {
    const totalAmountButton = document.getElementById("total-amount-button");
    const checkAmountButton = document.getElementById("check-amount");
    const totalAmountInput = document.getElementById("total-amount");
    const userAmountInput = document.getElementById("user-amount");
    const productTitleInput = document.getElementById("product-title");
    const amountDisplay = document.getElementById("amount");
    const expenditureValueDisplay = document.getElementById("expenditure-value");
    const balanceAmountDisplay = document.getElementById("balance-amount");
    


    // 初始化显示
    function initialize() {
        let dataString = localStorage.getItem(username);
        if (dataString) {
            let data = JSON.parse(dataString);
            // 假设data结构是：[username, password, budget, expense, balance]
            if (data && data.length >= 5) {
                amountDisplay.textContent = data[2] || 0; // 预算
                expenditureValueDisplay.textContent = data[3] || 0; // 开销
                balanceAmountDisplay.textContent = data[4] || 0; // 余额
            }
        }
    }

    // 更新数据
    function updateData(newBudget, newExpense) {
        let dataString = localStorage.getItem(username);
        let data = dataString ? JSON.parse(dataString) : [username, '', 0, 0, 0]; // 默认值
        data[2] = newBudget !== null ? newBudget : data[2];
        data[3] = newExpense !== null ? (parseFloat(data[3]) + newExpense) : data[3];
        data[4] = data[2] - data[3]; // 更新余额
        localStorage.setItem(username, JSON.stringify(data));
    }

    // 设置预算
    totalAmountButton.addEventListener("click", function() {
        const totalAmount = parseFloat(totalAmountInput.value);
        if (!isNaN(totalAmount) && totalAmount > 0) {
            updateData(totalAmount, null); // 仅更新预算
            initialize(); // 刷新显示
            totalAmountInput.value = ''; // 清除输入
        }
    });

    // 添加开销
    checkAmountButton.addEventListener("click", function() {
        const userAmount = parseFloat(userAmountInput.value);
        if (!isNaN(userAmount) && userAmount > 0) {
            updateData(null, userAmount); // 仅添加开销
            initialize(); // 刷新显示
            userAmountInput.value = ''; // 清除输入
            productTitleInput.value = ''; // 清除输入
        }
    });

    initialize(); // 页面加载时初始化
});
