document.addEventListener('DOMContentLoaded', () => {
	const quiz = new Quiz(15, 100, '/10code-quiz/questions_fr.json', 'written');

	// If you're using written-answer:
	document.getElementById('btn-submit-answer').addEventListener('click', () => {
		quiz.answerSubmitCallBack();
	});
});