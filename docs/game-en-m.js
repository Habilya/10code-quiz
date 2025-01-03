document.addEventListener('DOMContentLoaded', () => {
	const quiz = new Quiz(10, 100, '/10code-quiz/questions_en.json', 'multiple');
	quiz.handleChoiceSelection();
});