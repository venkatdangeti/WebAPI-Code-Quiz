
// DOM elements
var questionEle = document.querySelector("#questions");
var timerEle = document.querySelector("#time");
var choicesEle = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initials = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");


// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startQuiz() {

  // hide start screen of the quiz
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  // un-hide questions section
  questionEle.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time of the question
  timerEle.textContent = time;

  getQuestions();
}



function getQuestions() {

  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEle = document.getElementById("question-title");
  titleEle.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEle.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;


    choiceNode.onclick = questionClick;

    // display on the page
    choicesEle.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 20;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEle.textContent = time;
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
    feedback.style.fontSize = "400%";
  } else {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    feedback.style.fontSize = "400%";
  }

  // right/wrong feedback
  feedback.setAttribute("class", "feedback");
  setTimeout(function () {
    feedback.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestions();
  }
}

function quizEnd() {

  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEle = document.getElementById("final-score");
  finalScoreEle.textContent = time;

  // hide questions section
  questionEle.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEle.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initials.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}


// start quiz
startBtn.onclick = startQuiz;

initials.onkeyup = checkForEnter;

// submit initials
submitBtn.onclick = saveHighscore;