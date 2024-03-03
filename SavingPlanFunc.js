document.getElementById("add-row-btn").addEventListener("click", function() {
    var table = document.getElementById("data-table");
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4); // Add new cell for the delete button


    cell1.innerHTML = "<input type='text'>";
    cell2.innerHTML = "<input type='number'>";
    cell3.innerHTML = "<input type='number'>";
    cell4.innerHTML = "<select>" +
        "<option value='day'>Day</option>" +
        "<option value='week'>Week</option>" +
        "<option value='month'>Month</option>" +
        "<option value='year'>Year</option>" +
        "</select>";
    cell5.innerHTML = "<button class='delete-row-btn'>Delete</button>"; // Add delete button

});

// Add event listener for delete row buttons using event delegation
document.getElementById("data-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-row-btn")) {
        var row = event.target.closest("tr");
        row.parentNode.removeChild(row); // Remove the row when the delete button is clicked
    }
});

//here

// 保存数据到 LocalStorage
function saveData() {
    var table = document.getElementById("data-table");
    var data = [];
    for (var i = 1; i < table.rows.length; i++) { // 假设第一行是标题行，从第二行开始
        var row = table.rows[i];
        var rowData = [];
        for (var j = 0; j < row.cells.length - 1; j++) { // 假设最后一个单元格是删除按钮，不保存
            var input = row.cells[j].querySelector('input, select');
            rowData.push(input ? input.value : '');
        }
        data.push(rowData);
    }
    localStorage.setItem('myData', JSON.stringify(data));
    console.log('Data saved:', JSON.stringify(data));
}
function addRow(rowData) {
    var table = document.getElementById("data-table");
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = "<input type='text' value='" + rowData[0] + "'>";
    cell2.innerHTML = "<input type='number' value='" + rowData[1] + "'>";
    cell3.innerHTML = "<input type='number' value='" + rowData[2] + "'>";
    cell4.innerHTML = "<select><option value='day'>Day</option><option value='week'>Week</option><option value='month'>Month</option><option value='year'>Year</option></select>";
    cell5.innerHTML = "<button class='delete-row-btn'>Delete</button>";

    // Set the select value to match rowData
    var select = cell4.querySelector("select");
    select.value = rowData[3];
}

// 从 LocalStorage 加载数据
function loadData() {
    const dataStr = localStorage.getItem('myData');
    if (dataStr) {
        const data = JSON.parse(dataStr);
        data.forEach(rowData => {
            addRow(rowData);
        });
    }
}


// 在页面加载完成后加载数据
document.addEventListener('DOMContentLoaded', loadData);


document.getElementById("data-table").addEventListener('input', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        saveData();
    }
});


window.addEventListener('beforeunload', function(event) {
    saveData();
    // 根据需要，您可以在这里添加离开页面的确认逻辑
});
