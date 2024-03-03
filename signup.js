let name;
let password;
function createUser() {
    name = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log("name:"+name+", password:"+password);
    const outputElement = document.getElementById("err text");
    outputElement.textContent = "";
    var user = localStorage.getItem(name);
    if (user === null) {
        // name does not exist in localStorage
        console.log('The key does not exist in localStorage.');
        writeToFile(name, password);
        window.location.href = "./dashboard.html?username=" + encodeURIComponent(name);
    } else {
        // Key exists, handle the value
        console.log("not empty");
        console.log("Match found: " + user[0] + user[1]);
        setTimeout(function() {
            // This code will be executed after 1 second
            console.log("1 second has passed");}, 1000);
        outputElement.textContent = "This user already exist!";
    }
}
function writeToFile(name, password) {
    let data = [];
    data.push(name);
    data.push(password);
    data.push(0);
    data.push(0);
    data.push(0);
    data.push([]);
    console.log("data array:"+data[0]+data[1]);
    // Data to write to the file.
    localStorage.setItem(name, JSON.stringify(data));
}