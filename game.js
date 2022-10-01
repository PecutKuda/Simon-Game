var started = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
function playSound(chosenColour)
{
    var audio = new Audio("sounds/" + chosenColour + ".mp3");
    audio.play();
}
function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence()
{
    var randNum = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function() {
    if (started == false) 
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) 
    {
        //console.log("success");
        if (userClickedPattern.length === gamePattern.length)
        {
            nextSequence();
            userClickedPattern = [];
        }
    }
    else 
    {
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}
function startOver()
{
    level = 0 ;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


