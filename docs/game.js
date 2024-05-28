const question = document.getElementById('question');
const nextQuestionContainer = document.getElementById('next-question');
const nextQuestionButton = document.getElementById('btn-next-question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
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
        choices.forEach((choice) => {
            choice.parentElement.classList.remove('correct');
            choice.parentElement.classList.remove('incorrect');
        });
        getNewQuestion();
    });
};

getNewQuestion = () => {
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

    // randomly pick answers from other questions
    const wrongAnswers = getRandomNumbers(availableQuesions.length, questionIndex);

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = availableQuesions[wrongAnswers[number - 1]].answer;
    });

    // set the right answer with currentQuestion
    const rightAnswerIndex = Math.floor(Math.random() * 4);
    choices[rightAnswerIndex].innerText = currentQuestion.answer;

    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        let classToApply = '';
        if (selectedAnswer === currentQuestion.answer) {
            classToApply = 'correct';
            incrementScore(CORRECT_BONUS);
        } else {
            classToApply = 'incorrect';
            // show the correct answer
            choices.forEach((choice) => {
                if (choice.innerText === currentQuestion.answer) {
                    choice.parentElement.classList.add('correct');
                }
            });
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            nextQuestionButton.style.display = "block";
        }, 1000);
    });
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
