var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// The game page
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  buttonClickAnimation(this);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    makeSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function removeOverPage() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randNum = Math.floor(Math.random() * 4);
  var randColor = buttonColors[randNum];
  gamePattern.push(randColor);
  $("#" + randColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makeSound(randColor);
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function buttonClickAnimation(divButton) {
  $(divButton).addClass("clicked");
  setTimeout(function removeClickedClass() {
    $(divButton).removeClass("clicked");
  }, 150);
}
