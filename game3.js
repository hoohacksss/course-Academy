const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Adenine, a nitrogen base, is found in all of the following EXCEPT:",
    choice1: "RNA",
    choice2: "Amino Acids",
    choice3: "ATP",
    choice4: "cAMP",
    answer: 2
  },
  {
    question:
      " The lac operon is ",
    choice1: "A. is found in eukaryotic cells",
    choice2: "codes for the sequence of amino acids in lactas.",
    choice3: " regulates the translation of mRNA.",
    choice4: " regulates transcription by turning on or off the production of a repressor protein.",
    answer: 4
  },
  {
    question: "ATP is required for all of the following processes EXCEPT:",
    choice1: "active transport by transport proteins",
    choice2: "facilitated diffusion",
    choice3: " microtubule movement within flagella",
    choice4: "Na+/K+ pump activity",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();