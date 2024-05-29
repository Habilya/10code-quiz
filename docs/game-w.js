const question = document.getElementById('question');
const nextQuestionContainer = document.getElementById('next-question');
const nextQuestionButton = document.getElementById('btn-next-question');
const answerComment = document.getElementById('lbl-answer-comment');
const submitAnswerButton = document.getElementById('btn-submit-answer');
const inputAnswer = document.getElementById('inputAnswer');

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch('/10code-quiz/questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 100;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
	nextQuestionButton.addEventListener('click', (e) => {
        getNewQuestion();
    });
};

getNewQuestion = () => {
	answerComment.classList.remove('incorrect-label');
	answerComment.classList.remove('correct-label');
	answerComment.innerText = '';
    nextQuestionButton.style.display = "none";
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
		return window.location.assign('/10code-quiz/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

	acceptingAnswers = true;
	inputAnswer.disabled = false;
	inputAnswer.value = '';
};

submitAnswerButton.addEventListener('click', (e) => {
	if (!acceptingAnswers) return;

	acceptingAnswers = false;
	inputAnswer.disabled = true;
	if (inputAnswer.value === currentQuestion.answer) {
		answerComment.classList.add('correct-label');
		answerComment.innerText = 'Correct!';
	} else {
		answerComment.classList.add('incorrect-label');
		answerComment.innerText = `The answer is : ${currentQuestion.answer}`;
	}

	setTimeout(() => {
		nextQuestionButton.style.display = "block";
	}, 1000);
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

getRandomNumbers = (maxQuestions, rightAnswer) => {
    let numbers = [];
    while (numbers.length < 4) {
        let randomNum = Math.floor(Math.random() * (maxQuestions));
        if (!numbers.includes(randomNum) && randomNum != rightAnswer) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}
