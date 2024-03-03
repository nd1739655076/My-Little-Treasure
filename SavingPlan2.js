const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
console.log("passed username="+username);

document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById("add-row-btn");
    const dataTable = document.getElementById("data-table");
    

    // 添加新行到表格
    function addRow(param1, param2, param3, param4) {
        // if (param1 === null) {
        //     param1 = '';
        // }
        var rowData=[param1,param2,param3,param4];
        console.log("rowData=",rowData);
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
        let userData = localStorage.getItem(username);
        if (userData) {
            userData = JSON.parse(userData);
            var data = userData[5];
            if (Array.isArray(data) && data.length !== 0) {
                data.forEach(rowData => addRow(rowData[0],rowData[1],rowData[2],rowData[3]));
            }
        }
    }

    // 将用户数据保存到 localStorage
    function saveData() {
        let userString = localStorage.getItem(username);
        let userData = JSON.parse(userString); // 默认值
        var data = userData[5];
        console.log("5th data:"+data);
        data = [...dataTable.rows].slice(1).map(row => {
            const inputs = row.querySelectorAll('input, select');
            return Array.from(inputs).map(input => input.value);
        });
        userData[5] = data;
        localStorage.setItem(username, JSON.stringify(userData));
    }

    // 事件监听器：添加新行
    addRowBtn.addEventListener("click", function() {
        addRow('','','','day');
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

    // 页面关闭或刷新前保存数据
    window.addEventListener('beforeunload', saveData());
});

