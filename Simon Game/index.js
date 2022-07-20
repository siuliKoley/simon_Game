const buttonColors=["red","blue","green", "yellow"];
var gamepattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//get the id of the btn clicked
$(".btn").on('click',(function(){
  // if(keyPressed){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
 
}));
//check whether keypress matched the patter or not
function checkAnswer(level){

 if(gamepattern[level]==userClickedPattern[level]){

  if(userClickedPattern.length==gamepattern.length){
    setTimeout(function(){nextSequence()},1000);
  }
 }
 else{
      gameOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
      //start the game once
      startOver();
 }
 

}


//function to generate a random number
function nextSequence(){
  userClickedPattern=[];
  
  level++;
  $("#level-title").text("Level " + level);

  //get random color from the array
  var rand=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[rand];
  gamepattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

//play sound
function playSound(id){
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

function gameOver(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")},200);
}

function startOver(){
  level=0;
  gamepattern=[];
  started=false;
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed")
 }, 100);
}
//background red game over




