document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById("add-row-btn");
    const dataTable = document.getElementById("data-table");

    // Function to add a new row to the table
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

    // Load data from local storage and populate the table
    function loadData() {
        const dataStr = localStorage.getItem('myData');
        if (dataStr) {
            const data = JSON.parse(dataStr);
            data.forEach(rowData => addRow(rowData));
        }
    }

    // Save table data to local storage
    function saveData() {
        const data = [...dataTable.rows].slice(1).map(row => {
            const inputs = row.querySelectorAll('input, select');
            return Array.from(inputs).map(input => input.value);
        });
        localStorage.setItem('myData', JSON.stringify(data));
    }

    // Event listener for adding a new row
    addRowBtn.addEventListener("click", function() {
        addRow();
    });

    // Event delegation for deleting a row and saving data on input/select change
    dataTable.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-row-btn")) {
            event.target.closest("tr").remove();
            saveData();
        }
    });

    dataTable.addEventListener('input', saveData);

    // Initial load of stored data
    loadData();
});

window.addEventListener('beforeunload', saveData); // Save data when the page is being unloaded
