function checkUser() {
    name = document.getElementById("username").value;
    password = document.getElementById("password").value;
    const outputElement = document.getElementById("err text");
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    var fileContent = "";
    var loginSuccessful = false; // 新增变量来跟踪登录状态

    // Define a callback function to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Check if the request is complete
            if (xhr.status === 200) { // Check if the request was successful
                fileContent = xhr.responseText;
                var lines = fileContent.split('\n');
                
                lines.forEach(function(line) {
                    if (line && line.trim() !== '') {
                        var words = line.split(' ');
                        var firstWord = words[0]; // 用户名
                        var currentPassword = words[1]; // 密码
                        
                        if (firstWord === name && currentPassword === password) {
                            loginSuccessful = true; // 登录成功
                            return; // 找到匹配项，结束循环
                        }
                    }
                });
                
                if (loginSuccessful) {
                    // 如果登录成功，跳转到dashboard.html
                    window.location.href = "./newCalculator.html";
                } else {
                    // 如果未找到匹配项或密码不正确，显示错误消息
                    outputElement.textContent = "Invalid username or password.";
                }
            } else {
                // If there was an error, display an error message
                outputElement.textContent = "Error loading user.txt";
            }
        }
    };

    // Open the file using a GET request
    xhr.open("GET", "./users.txt", true);

    // Send the request
    xhr.send();
}
