
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = 0;
var started = false;
$(".btn").click(clickmouse);
$(".btnn").click(startgame);

function startgame() {
    if (started==false) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      flag=1;

    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    highscore(level);
}


function clickmouse() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    checkAnswer(userClickedPattern.length-1);
    if(flag==1){
      $(".btnn").click(startAgain);
     
    }
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press reset button to Restart");
      $(".chgbtn").html('<button value="RESET" class="btnn btnn-hover">RESET</button>');
      flag=0;
      startOver();
    }
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

 
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(".btnn").click(startgame);
}
function startAgain() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#level-title").text(" Press start button to play");
  $(".chgbtn").html('<button value="RESET" class="btnn btnn-hover">START</button>');
  $(".btnn").click(startgame);
}
var input=0;
function highscore(level){
if(level>input){
  input=level;
  $(".high").html('<h2>HIGH SCORE IS:<h2>'+"level   "+input);
}
  

}
  