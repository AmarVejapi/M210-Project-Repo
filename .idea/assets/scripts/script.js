let score = 0;
let currentQuestion = {
    question: "5 + 3 = ?",
    answer: 8
};

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value;
    const feedback = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");

    if (parseInt(userAnswer) === currentQuestion.answer) {
        score++;
        feedback.textContent = "Richtig!";
        feedback.style.color = "green";
    } else {
        score = 0;
        feedback.textContent = "Falsch! Punkte zurückgesetzt.";
        feedback.style.color = "red";
    }

    scoreElement.textContent = score;
    setNextQuestion();
}

function setNextQuestion() {
    currentQuestion.question = "6 + 4 = ?";
    currentQuestion.answer = 10;
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("answer").value = '';
}
