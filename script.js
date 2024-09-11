const questions = [
    { correct: 'A' }, 
    { correct: 'B' }, 
    { correct: 'C' }, 
    { correct: 'D' }, 
    { correct: 'A' }, 
    { correct: 'B' }, 
    { correct: 'C' }, 
    { correct: 'D' }, 
    { correct: 'A' }, 
    { correct: 'B' }
];

let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;
let score = parseInt(localStorage.getItem('score')) || 0;
let completed = localStorage.getItem('completed') === 'true';
let selectedAnswer = null;

function selectAnswer(answer) {
    selectedAnswer = answer;

    document.querySelectorAll('.answer-button').forEach(button => {
        button.style.opacity = '0.5';
        button.disabled = true;
    });
    
    document.querySelector(`.answer-button.${answer.toLowerCase()}`).style.opacity = '1';
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('score', score);

    if (currentQuestion < questions.length) {
        loadNextQuestion();
    } else {
        showResults();
        localStorage.setItem('completed', 'true');
    }
}

function loadNextQuestion() {
    document.getElementById('question-number').innerText = `Question ${currentQuestion + 1}`;
    selectedAnswer = null;

    document.querySelectorAll('.answer-button').forEach(button => {
        button.style.opacity = '1';
        button.disabled = false;
    });

    document.getElementById('next-button').disabled = true;
}

function showResults() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.getElementById('question-number').style.display = 'none';

    const resultDiv = document.getElementById('result');
    const scorePercentage = score / questions.length;

    resultDiv.innerHTML = `
        <div class="pie-chart" style="--score-percentage: ${scorePercentage * 100}"></div>
        <div class="inner-circle">
            <span class="score-text">${score}/${questions.length}</span>
        </div>
    `;
}

if (completed) {
    showResults();
} else if (currentQuestion < questions.length) {
    loadNextQuestion();
} else {
    showResults();
}
