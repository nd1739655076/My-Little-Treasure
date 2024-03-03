let name;
let password;

function createUser() {
    name = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log("name:"+name+", password:"+password);
    const outputElement = document.getElementById("err text");
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    var fileContent = "";
    // Define a callback function to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Check if the request is complete
            if (xhr.status === 200) { // Check if the request was successful
                // If successful, display the content of the file
                //outputElement.textContent = xhr.responseText;
                fileContent = xhr.responseText;
                console.log(fileContent);
                var lines = fileContent.split('\n');
                console.log(lines[0]);
                lines.forEach(function(line) {
                    // Check if the line is defined and not empty
                    if (line && line.trim() !== '') {
                        // Split the line into words based on a space character
                        var words = line.split(' ');
                        
                        // Get the first word (index 0) from the array of words
                        var firstWord = words[0];
                        console.log("name:"+name+",first word:"+firstWord);
                        
                        // Compare the first word to the search term
                        if (firstWord === name) {
                            // If the first word matches the search term, do something
                            console.log("Match found: " + line);
                            outputElement.textContent = "This user already exist!";
                        }
                    }
                });
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
    //TODO: write into file
}


// window.onload = function() {
//     // Make an AJAX request to fetch the contents of user.txt
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "user.txt", true);
//     function readFile() {

//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 // File contents are in xhr.responseText
//                 var content = xhr.responseText;
                
//                 // Display the content in the output element
//                 var outputElement = document.getElementById("err text");
//                 outputElement.textContent = content;
//             }
//         };
//     }
//     xhr.send();
// };
