function checkUser() {
    name = document.getElementById("username").value;
    password = document.getElementById("password").value;
    const outputElement = document.getElementById("err text");
    outputElement.textContent = "";
    var userStr = localStorage.getItem(name);
    if (userStr === null) {
        // name does not exist in localStorage
        console.log('User does not exist');
        setTimeout(function() {
            // This code will be executed after 1 second
            outputElement.textContent = "Invalid username or password.";
            console.log("1 second has passed");}, 100);
    } else {
        // Key exists, handle the value
        const user = JSON.parse(userStr);
        if (user[1] === password) {
            console.log("username exist:"+user[0]+", password corrext:"+user[1]);
            window.location.href = "./dashboard.html?username=" + encodeURIComponent(name); //TODO:jump to dashboard
        } else {
            console.log("username exist:"+user[0]+", password wrong:"+user[1]);
            setTimeout(function() {
            // This code will be executed after 1 second
            outputElement.textContent = "Invalid username or password.";
            console.log("1 second has passed");}, 100);
        }
    }
}
