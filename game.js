var agentChoice;
var userChoice;

var userWins = 0;
var agentWins = 0;
var lastWinner;

var userTrajectory = [];
var agentTrajectory = [];

algNames = ["scissors", "paper", "rock", random(), "rock"]


//Create random distribution of selected algorithms
var weights = new Array(algNames.length).fill(1)

//create result for each algorithm
var result = new Array(algNames.length).fill(0)



// this function get weighs and list, return agent by attntions to their weight
function weighted_rand(weights, list) {
  var sum = weights.reduce((a,b) => a+b,0);
  var rand = Math.random() * sum;
  var value = 0;
  for (var i = 0; i < weights.length; i++){
      value += weights[i];
      if (value >= rand) {
          return list[i] ;
          break;
      }
  }
}



//Update Weight
function updateWeight(){

  var eta = userTrajectory.length * Math.log(result.length);
  for(i=0; i < result.length; i++) {
      weights[i] = Math.max(Math.exp( -1 * eta * (Math.max(...result) - result[i])**2 ),0.0001);

  }
}

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
  weights = Array(algNames.length).fill(1)
  result = Array(algNames.length).fill(0)

}

// Uniform random functions on [Paper, Scissors and Rock]
function random() {
  const actions = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * actions.length);
  return  actions[random]
}

function behavioral(){
  if (userTrajectory.length == 0) {
    return random();
  
  }
  else {
  var lastPlayerMove = userTrajectory[userTrajectory.length -1]
  var lastAgentMove = agentTrajectory[userTrajectory.length -1]

  switch (compare(lastPlayerMove, lastAgentMove)){
    case 1:
      return lastPlayerMove;
      break;

    case 2:
      switch (lastPlayerMove){
        case "paper":
          return "scissors"
          break;
        case "scissors":
          return "rock"
          break;
        case "rock":
          return "paper"
          break;
      }
      case 0:
        return random()
        break;
  }
  }
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

// element-wise multipication
function mult(a,b){
  return a.map((e,i) => e * b[i]);
}


// update result for each algorithms
function updateResult(list_Actions){
  for (i=0; i<list_Actions.length; i++) {
      switch (compare(list_Actions[i],userChoice)){
        case 0:
          result[i] += 0;
          break;

        case 1:

          result[i] += 1;
          break;
      
        case 2:

          result[i] -= 1;
          break;
      }
    }
  }


//This function change the GUI and compare choices
// 1. The "reset button" will appear
// 2. agent plays her strategy
// 3. compare functions show the winner and add the result in Trajectories
function start(){
  let ra = random();
  let be = behavioral();
  list_Actions = ["scissors", "paper", "rock", ra, be]
  document.getElementById("reset-btn").style.display =""
  let agent = weighted_rand(weights,list_Actions)
  let game = compare(agent, userChoice)
  userTrajectory.push(userChoice)
  agentTrajectory.push(agent)

  switch (game) {
    case 1:
    agentWins += 1
    lastWinner = "agent"
    changeBG("#E6334D")
    break;

    case 2:
    userWins += 1
    lastWinner = "player"
    changeBG("#60A677")
    break;

    case 0:
    changeBG("#ECDCC7")
    break;
  }
  updateResult(list_Actions)
  document.getElementById('image2').src = "img/" + agent + ".svg";
  document.getElementById('agentScore').innerHTML = "Robot's Score: " + agentWins;
  document.getElementById('userScore').innerHTML = "Your Score: " + userWins;
  updateWeight();
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
console.log(behavioral())