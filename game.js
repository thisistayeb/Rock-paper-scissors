var agentChoice;
var userChoice;

var userWins = 0;
var agentWins = 0;
var lastWinner;

var userTrajectory = [];
var agentTrajectory = [];

// Changing background of body
function changeBG(color){

  document.body.style.backgroundColor = color;
}

//Keyboard event listeners
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
  if(e.which == 49) {  // 1️⃣ key
      scissors();
  }
  else if(e.which == 50) { // 2️⃣ key
      paper();
  }
  else if (e.which == 51){// 3️⃣ Key
    rock()
  }
}

// This function It restores the initial state of games and GUI
function reset() {
  userTrajectory = [];
  agentTrajectory = [];
  userWins = 0;
  agentWins = 0;
  changeBG("white");
  document.getElementById("reset-btn").style.display ="";
  document.getElementById('image2').src = "img/defult.svg";
  document.getElementById('agentScore').innerHTML = "Choose your action to start the game.";
  document.getElementById('userScore').innerHTML = "";
}

// Uniform random functions on [Paper, Scissors and Rock]
function random() {
  const actions = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * actions.length);
  return  actions[random]
}

function behavioral(){
// to do:


}

// This function resturns 1 if agent wins and 2 for wining of the user,
// 0 for draw
function compare(agent, user){
  switch (agent) {
    case "rock":
      switch (user) {
        case "rock":
          return 0
          break;
        case "scissors":
          return 1
          break;
        case "paper":
          return 2
      }
      break;

    case "scissors":
    switch (user) {
      case "rock":
        return 2
        break;
      case "scissors":
        return 0
        break;
      case "paper":
        return 1
    }
    break;

    case "paper":
    switch (user) {
      case "rock":
        return 1
        break;
      case "scissors":
        return 2
        break;
      case "paper":
        return 0
    }

  }
}


//This function change the GUI and compare choices
// 1. The "reset button" will appear
// 2. agent plays her strategy
// 3. compare functions show the winner and add the result in Trajectories
function start(){
  document.getElementById("reset-btn").style.display =""
  let agent = random()
  let game = compare(agent, userChoice)
  userTrajectory.push(userChoice)
  agentTrajectory.push(agent)

  switch (game) {
    case 1:
    agentWins += 1
    lastWinner = "agent"
    changeBG("#FF7F7F")
    break;

    case 2:
    userWins += 1
    lastWinner = "player"
    changeBG("#62de72")
    break;

    case 0:
    changeBG("white")
    break;
  }
  document.getElementById('image2').src = "img/" + agent + ".svg";
  document.getElementById('agentScore').innerHTML = "Robot's Score: " + agentWins;
  document.getElementById('userScore').innerHTML = "Your Score: " + userWins;
}



// functions for starting the game
function rock(){
  userChoice = "rock"
  start()
}
function paper(){
  userChoice = "paper"
  start()
}
function scissors(){
  userChoice = "scissors"
  start()
}
