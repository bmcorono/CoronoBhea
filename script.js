const words = ["apple", "amber", "angle", "actor", "apron"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 5;
document.getElementById("hint-letter").innerText = secretWord.charAt(0).toUpperCase();

document.getElementById("word-display").innerHTML = "_ ".repeat(secretWord.length).trim();

function checkGuess() {
    let guess = document.getElementById("user-guess").value.trim().toLowerCase();
    let messageElement = document.getElementById("message");
    
    if (guess === "") {
        messageElement.innerHTML = "<span style='color:red;'>Please enter a word!</span>";
        return;
    }
    
    if (guess === secretWord) {
        document.getElementById("word-display").innerHTML = secretWord.toUpperCase().split("").map(letter => `<span style='color:navy;'>${letter}</span>`).join(" ");
        messageElement.innerHTML = "🏆 <span style='color:white;'>Congratulations! You guessed the secret word!</span>";
        document.getElementById("play-again").style.display = "block";
        document.getElementById("user-guess").disabled = true;
        return;
    }
    
    attempts--;
    document.getElementById("word-display").innerHTML = guess.split("").map((letter, i) => {
        return letter === secretWord[i] ? `<span style='color:navy;'>${letter.toUpperCase()}</span>` : `<span style='color:red;'>${letter.toUpperCase()}</span>`;
    }).join(" ");
    
    if (attempts > 0) {
        messageElement.innerHTML = `<span style='color:red;'>Incorrect guess. You have ${attempts} attempts left!</span>`;
    } else {
        messageElement.innerHTML = `<span style='color:red;'>Game over! The secret word was '${secretWord}'.</span>`;
        document.getElementById("play-again").style.display = "block";
        document.getElementById("user-guess").disabled = true;
    }
}

function resetGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    attempts = 5;
    document.getElementById("hint-letter").innerText = secretWord.charAt(0).toUpperCase();
    document.getElementById("word-display").innerHTML = "_ ".repeat(secretWord.length).trim();
    document.getElementById("message").innerHTML = "";
    document.getElementById("user-guess").value = "";
    document.getElementById("user-guess").disabled = false;
    document.getElementById("play-again").style.display = "none";
}
