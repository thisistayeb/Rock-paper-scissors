var agentChoice;
var userChoice;

let userWins = 0;
let agentWins = 0;

let userTrajectory = [];
let agentTrajectory = [];

function reset() {
  userTrajectory = [];
  agentTrajectory = [];
  userWins = 0;
  agentWins = 0;
  document.getElementById("reset-btn").style.display ="";
  document.getElementById('image2').src = "img/defult.svg";
  changeBG("white")
  document.getElementById('agentScore').innerHTML = "Choose your action to start the game.";
  document.getElementById('userScore').innerHTML = "";
}


function rock(){
  userChoice = "rock"
  start()
}
function changeBG(color){
  
  document.body.style.backgroundColor = color;
}
function paper(){
  userChoice = "paper"
  start()
}
function scissors(){
  userChoice = "scissors"
  start()
  
}

function random() {
const actions = ["rock", "paper", "scissors"];

const random = Math.floor(Math.random() * actions.length);
return  actions[random]
}


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
function start(){
  document.getElementById("reset-btn").style.display =""
  let agent = random()
  let game = compare(agent, userChoice)
  userTrajectory.push(userChoice)

  switch (game) {
    case 1:
    agentWins += 1
    changeBG("#FF7F7F")
    break;

    case 2:
    userWins += 1
    changeBG("#62de72")
    break;

    case 0:
    changeBG("white")
    break;
  }
  document.getElementById('image2').src = "img/" + agent + ".svg";
  document.getElementById('agentScore').innerHTML = "Robot's Score: " + agentWins;
  document.getElementById('userScore').innerHTML = "Your Score: " + userWins;
  // changeBG("white")

}
