const FORM = document.getElementById("gameForm");
let computerNumber = 0;
let chance = 5;
let numberInput = document.querySelector("#inputNumber");
let startBtn = document.querySelector("#go");
let resetBtn = document.querySelector("#reset");
let resultArea = document.querySelector("#result");
let chanceArea = document.querySelector("#chance");
let numberList = [];
let gameOver = false;

let title = document.querySelector("a");

function pickRandomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log(computerNumber);
}

function reloadPage() {
  location.reload();
}

startBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
numberInput.addEventListener("focus", inputNumber);
title.addEventListener("click", reloadPage);

function inputNumber() {
  resultArea.textContent = "게임 시작! 숫자를 입력해주세요.";
  resultArea.classList.remove("hidden");
  chanceArea.classList.remove("hidden");
}

function play(event) {
  event.preventDefault();
  const USER_VALUE = numberInput.value;

  if (USER_VALUE === "") {
    resultArea.textContent = "게임 시작! 숫자를 입력해주세요.";
  } else if (USER_VALUE < computerNumber) {
    resultArea.textContent = "UP!";
  } else if (USER_VALUE > computerNumber) {
    resultArea.textContent = "DOWN!";
  } else {
    resultArea.textContent = "축하합니다! 정답입니다.";
    gameOver = true;
  }

  if (USER_VALUE < 1 || USER_VALUE > 100) {
    reset.textContent = "1부터 100 사이의 숫자를 입력해주세요.";
    return;
  }

  if (numberList.includes(USER_VALUE)) {
    resultArea.textContent = "이미 입력한 숫자입니다.";
    return;
  }

  chance--;

  numberList.push(USER_VALUE);

  chanceArea.textContent = `남은 기회 : ${chance}번`;

  if (chance === 0) {
    resultArea.textContent = "아쉽네요! 다시 한 번 도전 해보세요.";
    gameOver = true;
  }

  if (gameOver === true) {
    startBtn.disabled = true;
  }
}

function reset() {
  pickRandomNumber();
  numberInput.value = "";
  numberList = [];
  chance = 5;
  chanceArea.textContent = `남은 기회 : ${chance}번`;
  startBtn.disabled = false;
  gameOver = false;
  resultArea.textContent = "결과가 나온다.";
}

pickRandomNumber();
