document.addEventListener('DOMContentLoaded', () => {
	const quiz = new Quiz(15, 100, '/10code-quiz/questions_en.json', 'written');

	// If you're using written-answer:
	document.getElementById('btn-submit-answer').addEventListener('click', () => {
		quiz.answerSubmitCallBack();
	});

	document.getElementById("answerForm").addEventListener("submit", (event) => {
		event.preventDefault(); // Prevents the form from submitting the usual way
		quiz.answerSubmitCallBack();
	});
});