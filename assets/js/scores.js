//Printing highscores

function printHighScores() {
  // get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function (x, y) {
    return x.score - y.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    var linkTag = document.createElement("li");
    linkTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olElement = document.getElementById("highscores");
    olElement.appendChild(linkTag);
  });
}

function clearHighScores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function for highscore
printHighScores();