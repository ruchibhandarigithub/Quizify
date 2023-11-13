
const questions = [
    {
      question: '1)What is the capital of Germany?',
      options: ['London', 'Paris', 'Berlin', 'Rome'],
      correctAnswer: 2, // Index of the correct answer in the options array
      isMultipleChoice: false,
    },
    {
      question: '2)Select the even numbers.',
      options: ['2', '4', '5', '6', '8'],
      correctAnswer: [0, 1, 3, 4], // Indices of the correct answers in the options array
      isMultipleChoice: true,
    },
    {
      question: '3)Which mountain is known as the "Savage Mountain"?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
      correctAnswer: 1,
      isMultipleChoice: false,
    },
    {
      question: '4)Name the largest planet in our solar system.',
      correctAnswer: 'Jupiter', // Note: capitalization matters in fill-in-the-blank
      isFillInBlank: true,
    },
    {
      question: '5)Put the following numbers in descending order:',
      options: ['9', '3', '7', '1', '5'],
      correctAnswer: ['9', '7', '5', '3', '1'], // Correct sorted order
      isSorting: true,
    },
  ];
  
  
  

let currentQuestionIndex = 0;
let scor = 0;
let timerSeconds = 120; // Set the timer duration in seconds
let timerInterval;

const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options');
let score = 1; //initial value to be set
const nextButton = document.getElementById('next-button');
const finalSubmitButton = document.getElementById('final-submit-button');
const timerDisplay = document.getElementById('timer');

function startTimer() {
  timerInterval = setInterval(function () {
      if (timerSeconds > 0) {
          timerSeconds--;
          timerDisplay.textContent = timerSeconds;
      } else {
          clearInterval(timerInterval);
          endQuiz();
      }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function enableFinalSubmit() {
  finalSubmitButton.style.display = 'block';
  nextButton.style.display = 'none';
}

nextButton.addEventListener('click', () => {
  if (questions[currentQuestionIndex].isSorting) {
      const selectedOptions = document.querySelectorAll('.sorting-container input[name="answer"]');
      const userSortedAnswer = Array.from(selectedOptions).map((option) => option.value);
      const correctSortedAnswer = questions[currentQuestionIndex].correctAnswer;
      if (arraysEqual(userSortedAnswer, correctSortedAnswer)) {
          score++;
      }
  } else {
      const selectedOptions = document.querySelectorAll('input[name="answer"]:checked');
      const selectedIndices = Array.from(selectedOptions).map((option) => parseInt(option.value));

      if (Array.isArray(questions[currentQuestionIndex].correctAnswer)) {
          const correctAnswers = questions[currentQuestionIndex].correctAnswer;
          if (arraysEqual(selectedIndices, correctAnswers)) {
              score++;
          }
      } else if (questions[currentQuestionIndex].isFillInBlank) {
          const userAnswer = document.getElementById('fill-in-blank').value;
          if (userAnswer.toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase()) {
              score++;
          }
      } else {
          const correctAnswer = questions[currentQuestionIndex].correctAnswer;
          if (selectedIndices.length === 1 && selectedIndices[0] === correctAnswer) {
              score++;
          }
      }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      renderQuestion();
  } else {
      enableFinalSubmit();
  }
});

finalSubmitButton.addEventListener('click', () => {
  endQuiz();
});

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsList.innerHTML = '';

  if (currentQuestion.isFillInBlank) {
      optionsList.innerHTML = `
          <input type="text" id="fill-in-blank">
      `;
  } else if (currentQuestion.isSorting) {
      const sortContainer = document.createElement('div');
      sortContainer.className = 'sorting-container';
      for (let i = 0; i < currentQuestion.options.length; i++) {
          const option = currentQuestion.options[i];
          const optionElement = document.createElement('div');
          optionElement.innerHTML = `
              <input type="checkbox" name="answer" value="${i}" id="option${i}">
              <label for="option${i}">${option}</label>
          `;
          sortContainer.appendChild(optionElement);
      }
      optionsList.appendChild(sortContainer);
  } else {
      for (let i = 0; i < currentQuestion.options.length; i++) {
          const option = currentQuestion.options[i];
          const optionElement = document.createElement('li');
          optionElement.innerHTML = `
              <input type="${currentQuestion.isMultipleChoice ? 'checkbox' : 'radio'}" name="answer" value="${i}" id="option${i}">
              <label for="option${i}">${option}</label>
          `;
          optionsList.appendChild(optionElement);
      }
  }

  if (currentQuestionIndex === questions.length - 1) {
      enableFinalSubmit();
  }
}

function endQuiz() {
  stopTimer();
  const result = `Quiz Completed\nYour Score: ${score}/${questions.length}`;
  quizContainer.innerHTML = `<h1>${result}</h1>`;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

renderQuestion();
startTimer();

//-----exit btbn------//

const exitButton = document.getElementById('exit-button');
exitButton.style.display = 'none'; // Hide the exit button initially

exitButton.addEventListener('click', () => {
    // Add logic to navigate to the next page or perform any other actions
    window.location.href = '../startquiz/index.html'; // Replace '../startquiz/index.html' with the actual URL of your next page
});

function updateExitButtonVisibility() {
    if (finalSubmitButton.style.display === 'none') {
        // Show the exit button only when final submit button is clicked
        exitButton.style.display = 'block';
    } else {
        // Hide the exit button in other cases
        exitButton.style.display = 'none';
    }
}
 
finalSubmitButton.addEventListener('click', () => {
    var audio = new Audio("./sound.mp3")
    audio.play();
    endQuiz();
    updateExitButtonVisibility(); // Update exit button visibility after the final submit
});

function endQuiz() {


    stopTimer();
    const result = `Quiz Completed\nYour Score: ${score}/${questions.length}`;
    quizContainer.innerHTML = `<h1>${result}</h1>`;
    finalSubmitButton.style.display = 'none'; // Hide the final submit button after displaying the score
    updateExitButtonVisibility(); // Update exit button visibility after the quiz ends
}

// Call updateExitButtonVisibility() when rendering the first question
updateExitButtonVisibility();
