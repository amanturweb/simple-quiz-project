const questions = [
    {
        question: "Which one is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Girraffe", correct: false },
        ]
    },
    {
        question: "what one is the biggest country in the world?",
        answers: [
            { text: "China", correct: false },
            { text: "Kyrgyzstan", correct: false },
            { text: "Brazil", correct: false },
            { text: "Russia", correct: true },
        ]
    },
    {
        question: "Which one is the most popular programming language?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "Python", correct: true },
            { text: "C#", correct: false },
            { text: "Java", correct: false },
        ]
    },
    {
        question: "What is the fastest animal in the world?",
        answers: [
            { text: "Tiger", correct: false },
            { text: "Rabbit", correct: false },
            { text: "Lion", correct: false },
            { text: "Leopard", correct: true },
        ]
    },
    {
        question: "What is the most popular language in the world?",
        answers: [
            { text: "English", correct: true },
            { text: "Chinese", correct: true },
            { text: "Spanish", correct: false },
            { text: "French", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAsnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    };
}

function selectAsnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();