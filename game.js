var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var toggle = "false";
var index = -1;

//For detecting keypress by User
document.addEventListener("keydown", function() {
  if (toggle === "false") {
    toggle = "true";
    nextSequence();
  }
});

//For selecting all buttons and adding event listener seperately for each button
[...document.querySelectorAll('.btn')].forEach(function(item) {
  item.addEventListener('click', handler);
});

function handler(event) {

  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  index++;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length) - 1);
}

//For matching user's answer with actual pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 2000);

    }

  } else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    document.body.classList.add("game-over");
    setTimeout(function() {
      document.body.classList.remove("game-over");
    }, 200)
    var heading = document.querySelector("#level-title");
    heading.innerHTML = "Game over!! Press any key to restart.";

    startOver();
  }

}





//For increasing the level
function nextSequence() {

  userClickedPattern = [];
  var num = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[num];
  gamePattern.push(randomChosenColor);
  //For Animation of buttons Jquery used
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  var heading = document.querySelector("#level-title");
  heading.innerHTML = "Level " + level;
  level++;


}

//For adding animation
function animatePress(currentColor) {
  var active = document.querySelector("#" + currentColor);
  active.classList.add("pressed");
  setTimeout(function() {
    active.classList.remove("pressed");
  }, 100)
}

//For playing sound
function playSound(name) {
  var audio_address = "sounds/" + name + ".mp3";
  var audio = new Audio(audio_address);
  audio.play();
}



//For game Restart
function startOver() {
  level = 1;
  gamePattern = [];
  toggle = "false";
  index = -1;
}
