console.log("Laraib Khan");

const quizData = [
  {
    question: "What is the basic structure of an HTML document?",
    a: "<html> <body> <title>",
    b: "<html> <title> <body>",
    c: "<html> <head> <body>",
    d: "<html> <head> <title>",
    correct: "c",
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    a: "let",
    b: "var",
    c: "const",
    d: "All of the above",
    correct: "d",
  },
  {
    question: "What is an array in JavaScript?",
    a: "A single value",
    b: "a collection of values",
    c: "a function",
    d: "an object",
    correct: "b",
  },
  {
    question: "What is the basic syntax for writing a JavaScript function?",
    a: "function functionName() {}",
    b: "var functionName = function() {}",
    c: "functionName() {}",
    d: "function() {}",
    correct: "a",
  },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');

let currentQuiz = 0;
let score = 0;
let reviewAnswers = [];

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();

  if (answer) {
    reviewAnswers.push({
      question: quizData[currentQuiz].question,
      answer: answer,
      correct: quizData[currentQuiz].correct,
    });

    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button id="review">Review Answers</button>
      `;
      const reviewBtn = document.getElementById('review');
      reviewBtn.addEventListener('click', () => {
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review-container');

        reviewAnswers.forEach((answer) => {
          const reviewAnswer = document.createElement('div');
          reviewAnswer.classList.add('review-answer');

          if (answer.answer === answer.correct) {
            reviewAnswer.classList.add('correct');
          } else {
            reviewAnswer.classList.add('incorrect');
          }

          reviewAnswer.innerHTML = `
            <p>Question: ${answer.question}</p>
            <p>Your answer: ${answer.answer}</p>
            <p>Correct answer: ${answer.correct}</p>
          `;

          reviewContainer.appendChild(reviewAnswer);
        });

        quiz.appendChild(reviewContainer);
        reviewContainer.classList.add('show');

        reviewBtn.remove(); // Remove the "Review Answers" button

        const restartBtn = document.createElement('button');
        restartBtn.innerText = 'Restart Quiz';
        quiz.appendChild(restartBtn);

        restartBtn.addEventListener('click', () => {
          location.reload();
        });
      });
    }
  } else {
    feedbackEl.innerText = 'Please select an answer!';
  }
});
const styles = `
  @media (max-width: 768px) {
    .quiz-container {
      width: 100%;
      padding: 20px;
    }
    .question {
      font-size: 18px;
    }
    .answer {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .quiz-container {
      width: 100%;
      padding: 10px;
    }
    .question {
      font-size: 16px;
    }
    .answer{
    font
      }`