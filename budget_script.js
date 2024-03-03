document.addEventListener('DOMContentLoaded', function() {
    const totalAmountButton = document.getElementById("total-amount-button");
    const checkAmountButton = document.getElementById("check-amount");
    const totalAmountInput = document.getElementById("total-amount");
    const userAmountInput = document.getElementById("user-amount");
    const productTitleInput = document.getElementById("product-title");
    const amountDisplay = document.getElementById("amount");
    const expenditureValueDisplay = document.getElementById("expenditure-value");
    const balanceAmountDisplay = document.getElementById("balance-amount");
    
    // 假设username是已知的
    const username = 'knownUsername';

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

    // 更新预算并重新计算余额
    function updateBudget(newBudget) {
        let dataString = localStorage.getItem(username);
        if (dataString) {
            let data = JSON.parse(dataString);
            if (data && data.length >= 5) {
                // 更新预算
                data[2] = newBudget;
                // 重新计算余额
                data[4] = newBudget - data[3]; // 假设data[3]是开销
                // 保存更新后的数据
                localStorage.setItem(username, JSON.stringify(data));
            }
        }
    }

    totalAmountButton.addEventListener("click", function() {
        const totalAmount = parseFloat(totalAmountInput.value);
        if (!isNaN(totalAmount) && totalAmount > 0) {
            updateBudget(totalAmount);
            initialize(); // 刷新显示
            totalAmountInput.value = ''; // 清除输入
        }
    });

    initialize(); // 页面加载时初始化
});
