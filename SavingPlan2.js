document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById("add-row-btn");
    const dataTable = document.getElementById("data-table");
    const currentUsername = 'currentUser'; // 示例中使用静态用户名，实际应用中应动态获取

    // 添加新行到表格
    function addRow(rowData = ['', '', '', 'day']) {
        const newRow = dataTable.insertRow();
        newRow.innerHTML = `
            <td><input type='text' value='${rowData[0]}'></td>
            <td><input type='number' value='${rowData[1]}'></td>
            <td><input type='number' value='${rowData[2]}'></td>
            <td>
                <select>
                    <option value='day' ${rowData[3] === 'day' ? 'selected' : ''}>Day</option>
                    <option value='week' ${rowData[3] === 'week' ? 'selected' : ''}>Week</option>
                    <option value='month' ${rowData[3] === 'month' ? 'selected' : ''}>Month</option>
                    <option value='year' ${rowData[3] === 'year' ? 'selected' : ''}>Year</option>
                </select>
            </td>
            <td><button class='delete-row-btn'>Delete</button></td>
        `;
    }

    // 从 localStorage 加载用户数据
    function loadData() {
        let userData = localStorage.getItem(currentUsername);
        if (userData) {
            userData = JSON.parse(userData);
            if (userData.data && Array.isArray(userData.data)) {
                userData.data.forEach(rowData => addRow(rowData));
            }
        }
    }

    // 将用户数据保存到 localStorage
    function saveData() {
        let userData = localStorage.getItem(currentUsername);
        userData = userData ? JSON.parse(userData) : {username: currentUsername, password: '', budget: 0, expense: 0, balance: 0, data: []};
        userData.data = [...dataTable.rows].slice(1).map(row => {
            const inputs = row.querySelectorAll('input, select');
            return Array.from(inputs).map(input => input.value);
        });
        localStorage.setItem(currentUsername, JSON.stringify(userData));
    }

    // 事件监听器：添加新行
    addRowBtn.addEventListener("click", function() {
        addRow();
        saveData(); // 确保每次添加新行时数据都被保存
    });

    // 事件监听器：通过事件委托处理删除按钮的点击事件
    dataTable.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-row-btn")) {
            event.target.closest("tr").remove();
            saveData(); // 删除行后保存数据
        }
    });

    // 为input和select元素的变化保存数据
    dataTable.addEventListener('input', saveData);

    // 页面加载完成时加载数据
    loadData();
});

// 页面关闭或刷新前保存数据
window.addEventListener('beforeunload', saveData);
