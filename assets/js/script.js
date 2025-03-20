// Wait for DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      }
      else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }
  runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  //Generate two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  }
  else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  }
  else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  }
  else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType} Aborting!`;
  }
}

/**
 * Check the answer agani the first element in 
 * the returned caclulateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Hey! You got it right! :-D");
    incrementScore();
  }
  else {
    alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
    incrementIncorrectAnswer();
  }

  runGame(calculatedAnswer[1]);
}
/**
 * Gets the operand (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") { //Addition game
    return [operand1 + operand2, "addition"];
  }
  else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  }
  else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  }
  else {
    alert(`Unimplemented operator: ${operator}`);
    throw `Unimplemented operator: ${operator}. Aborting!`;
  }
}

/**
 * Get the current score from the DOM and increment it by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerHTML = ++oldScore;
}

/**
 * Get the current tally of incorrect answers from the DOM and increment it by 1
 */
function incrementIncorrectAnswer() {
  let oldIncorrect = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerHTML = ++oldIncorrect;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  /*if (operand2 > operand1) {
    let tempOperand = operand1;
    operand1 = operand2;
    operand2 = tempOperand;
  }

  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  */
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}