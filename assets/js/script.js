/** 
 * Wait for DOM to finish loading before running the game
 */
document.addEventListener("DOMContentLoaded", function () {

  //Add Eventlisteners to all buttons
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

  //Add Eventlistener to answer-box, wait for Enter
  document.getElementById("answer-box").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

  runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

  document.getElementById("answer-box").value = "";
  document.getElementById("answer-box").focus();

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
  else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  }
  else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType} Aborting!`;
  }
}

/**
 * Check the answer aganist the first element in 
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

  switch (operator) {
    case "+":
      return [operand1 + operand2, "addition"];
      break;
    case "-":
      return [operand1 - operand2, "subtract"];
      break;
    case "x":
      return [operand1 * operand2, "multiply"];
      break;
    case "/":
      return [operand1 / operand2, "division"];
      break;
    default:
      alert(`Unimplemented operator: ${operator}`);
      throw `Unimplemented operator: ${operator}. Aborting!`;
      break;
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

/**
 * Display an addition question 
 */
function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

/**
 * Display a subtract question
 */
function displaySubtractQuestion(operand1, operand2) {
  //Return the largest number first, to avoid answers with negative numbers
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

/**
 * Display a multiply question
 */
function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

/**
 * Display a division question
 */
function displayDivisionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1 * operand2;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "/";
}