let score = 0;
let lives = 5;
let level = 1;
let timeLeft = 20;
let timer;
let currentQuestion;

document.addEventListener("DOMContentLoaded", function() {
    // Erste Frage direkt setzen
    currentQuestion = generateQuestion();
    document.getElementById("question").textContent = currentQuestion.question;

    // Timer starten
    startTimer();

    // Focus auf das Eingabefeld setzen
    document.getElementById("answer").focus();

    // Enter für Antwortüberprüfung aktivieren
    document.getElementById("answer").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Anfangslives anzeigen
    updateLives();
});

function generateQuestion() {
    const maxNum = level * 20;  // Zahlenbereich abhängig vom Level
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;

    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let question, answer;

    switch (operation) {
        case '+':
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2} = ?`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2} = ?`;
            answer = num1 * num2;
            break;
        case '/':
            const temp = num1 * num2;
            question = `${temp} / ${num2} = ?`;
            answer = temp / num2;
            break;
    }

    return { question, answer };
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const feedback = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (parseInt(userAnswer) === currentQuestion.answer) {
        score += level * (20 - timeLeft);  // Punkte berechnen
        feedback.textContent = "Richtig!";
        feedback.style.color = "green";
        setNextQuestion();
    } else {
        lives--;
        updateLives();  // Leben aktualisieren
        if (lives === 0) {
            feedback.textContent = "Du hast verloren! Keine Leben mehr.";
            feedback.style.color = "red";
            clearInterval(timer);  // Timer stoppen
        } else {
            feedback.textContent = `Falsch! Leben verloren. Übrige Leben: ${lives}`;
            feedback.style.color = "red";
        }
    }

    scoreElement.textContent = score;
    document.getElementById("answer").value = '';
    document.getElementById("answer").focus();  // Fokus auf das Eingabefeld zurücksetzen
}

function updateLives() {
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = '';  // Alle Leben löschen
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("span");
        heart.textContent = i < lives ? "💖" : "💔";  // Füllherzen oder leere Herzen
        livesContainer.appendChild(heart);
    }
}

function setNextQuestion() {
    if (lives > 0) {
        currentQuestion = generateQuestion();
        document.getElementById("question").textContent = currentQuestion.question;
        timeLeft = 20;  // Timer zurücksetzen
        document.getElementById("timer").textContent = `Zeit: ${timeLeft}s`;
        startTimer();
    }
}

function startTimer() {
    timer = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = `Zeit: ${timeLeft}s`;
        } else {
            clearInterval(timer);
            checkAnswer();  // Antwort überprüfen, wenn die Zeit abgelaufen ist
        }
    }, 1000);
}
