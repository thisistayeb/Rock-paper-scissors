var userChoice;
var lastWinner;
var userWins = 0;
var agentWins = 0;

var userTrajectory = [];
var agentTrajectory = [];

algNames = ["scissors", "paper", "rock", random(), behavioral(), behavioral_attack(), maximumLikelihood()]

//Create random distribution of selected algorithms, initial with same amount value
var weights = new Array(algNames.length).fill(1)

//Create result for each algorithm
var result = new Array(algNames.length).fill(0)

// This function get weighs and list, return agent by attentions to their weight
function weighted_rand(weights, list) {
  let sum = weights.reduce((a,b) => a+b,0);
  let rand = Math.random() * sum;
  let value = 0;
  for (var i = 0; i < weights.length; i++){
      value += weights[i];
      if (value >= rand) {
          return list[i] ;
      }
  }
}

//Update Weight Array
function updateWeight(){

  let eta = userTrajectory.length * Math.log(result.length);
  for(i=0; i < result.length; i++) {
      weights[i] = Math.max(Math.exp( -1 * eta * (Math.max(...result) - result[i])**2 ),0.00001);
  }
}

// Changing background of body
function changeBG(color){
  document.body.style.backgroundColor = color;
}

//Keyboard event listeners
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
  if(e.which === 49) {  // 1️⃣ key
      scissors();
  }
  else if(e.which === 50) { // 2️⃣ key
      paper();
  }
  else if (e.which === 51){ // 3️⃣ Key
    rock();
  }
  else if (e.which === 48 ) { // 0️⃣ Key
    reset();
  }
}

// This function It restores the initial state of games and reset the GUI
function reset() {
  userTrajectory = [];
  agentTrajectory = [];
  userWins = 0;
  agentWins = 0;
  changeBG("white");
  document.getElementById("reset-btn").style.display ="";
  document.getElementById('image2').src = "img/default.svg";
  document.getElementById('agentScore').innerHTML = "Choose your action to start the game.";
  document.getElementById('userScore').innerHTML = "";
  document.getElementById('round').innerHTML = "";
  weights = Array(algNames.length).fill(1)
  result = Array(algNames.length).fill(0)
}

// Uniform random choice of [Paper, Scissors and Rock]
function random() {
  const actions = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * actions.length);
  return  actions[random]
}

// This behavioral function is based on the
//https://arxiv.org/pdf/1301.3238.pdf
function behavioral(){
  if (userTrajectory.length === 0) {
    return random();
  
  }
  else {
  var lastPlayerMove = userTrajectory[userTrajectory.length -1]
    let lastAgentMove = agentTrajectory[userTrajectory.length - 1];

    switch (compare(lastPlayerMove, lastAgentMove)){
    case 1:
      return lastPlayerMove;

    case 2:
      switch (lastPlayerMove){
        case "paper":
          // Player will play "scissors"
          return "rock"
        case "scissors":
          //player will play "rock"
          return "paper"
        case "rock":
          // player will play "paper"
          return "scissors"
      }
      case 0:
        return random()
    }
  }
}

// Best response to the player who assumes you play behavioral strategy
function behavioral_attack(){
  if (userTrajectory.length === 0) {
    return random();
  }
  else {
  let lastPlayerMove = userTrajectory[userTrajectory.length -1]
  let lastAgentMove = agentTrajectory[userTrajectory.length -1]

  switch (compare(lastPlayerMove, lastAgentMove)){
    case 2:
      switch (lastAgentMove){
        case "paper":
          return "rock"
        case "scissors":
          return "paper"
        case "rock":
          return "scissors"
      }

    case 1:
      switch (lastPlayerMove){
        case "paper":
          return "rock"
        case "scissors":
          return "paper"
        case "rock":
          return "scissors"
      }
      case 0:
        return random()
        break;
  }
  }
}


// This function return best response according to "Maximum Likelihood" of the player
function maximumLikelihood(trajectory) {
  if (agentTrajectory.length == 0) {return random()}
  else{

    let rock_played = userTrajectory.filter(x => x === "rock").length / trajectory.length;
    let paper_played = userTrajectory.filter(x => x === "paper").length / trajectory.length;

    let rand = Math.random();
    if (rand < rock_played) {
      // agent plays ROCK
      return "paper"
    }
    else if (rand < (paper_played + rock_played)) {
      // agent plays Paper
      return "scissors"
    }
    else{
      // agent plays scissors
      return "rock"
    }
}
}

// TODO: if player two step repeated cycle 
function twoStepBack(){
  if (agentTrajectory.length >= 2){

  }
}

// This function returns 1 if agent wins and 2 for wining of the user,
// and 0 for draw
function compare(agent, user){
  switch (agent) {
    case "rock":
      switch (user) {
        case "rock":
          return 0
        case "scissors":
          return 1
        case "paper":
          return 2
      }
      break;

    case "scissors":
    switch (user) {
      case "rock":
        return 2
      case "scissors":
        return 0
      case "paper":
        return 1
    }
    break;

    case "paper":
    switch (user) {
      case "rock":
        return 1
      case "scissors":
        return 2
      case "paper":
        return 0
    }

  }
}

// update result for each the algorithms
function updateResult(list_Actions){
  for (let i=0; i<list_Actions.length; i++) {
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

//This is the main function of game, This function play the game, compare the game, and also change the GUI of the game
// 1. The "reset button" will appear
// 2. agent plays her strategy
// 3. compare functions show the winner and append results in Trajectories
function start(){
  // run algorithms and store their decision
  let ra = random();
  let be = behavioral();
  let att = behavioral_attack()
  let maxLike = maximumLikelihood(userTrajectory)

  // This Array contains decisions of algorithms, first three elements are deterministic
  let list_Actions = ["scissors", "paper", "rock", ra, be, att, maxLike]

  // Show the `reset button` by removing "display: none;"
  document.getElementById("reset-btn").style.display =""

  // Computer decide randomly according to weights of algorithms
  let agent = weighted_rand(weights,list_Actions)

  // Play Agent's move VS. Player's move
  let game = compare(agent, userChoice)

  // Append Agent and Player's move their trajectory array
  userTrajectory.push(userChoice)
  agentTrajectory.push(agent)

  // Depend on the result of game, update changing background to Green (#60A677) for winning the player
  // Red (#E6334D) the player lost, and Cream color (#ECDCC7) in case of Draw
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
  // Update result of algorithms until this level of games
  updateResult(list_Actions)

// Update Weight array based the result array
  updateWeight();
  // show image of Agent choice in the GUI
  document.getElementById('image2').src = "img/" + agent + ".svg";
  document.getElementById('agentScore').innerHTML = "Robot's Score: " + agentWins;
  document.getElementById('userScore').innerHTML = "Your Score: " + userWins;
  document.getElementById('round').innerHTML = "Draws: " + (userTrajectory.length - (agentWins+userWins));
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
