"use strict";
/*получаем область сообщений*/
let message1 = document.querySelector("#messageArea_1");
let msg1 = "Формат ввода: A1";
message1.innerHTML = msg1;

let message2 = document.querySelector("#messageArea_2");
let msg2 = "Формат ввода: A1";
message2.innerHTML = msg2;
let gameOver = document.querySelector("#finish");

/* рандомный генератор размещения корабля*/
let shipsSet = new Set();
function generateShip() {
  while (shipsSet.size <= 18) {
    let row = Math.floor(Math.random() * 7);
    let column = Math.floor(Math.random() * 7);
    let position = String(row) + String(column);
    shipsSet.add(position);
  }
  return shipsSet;
}
generateShip();

/*получаем область счёта*/
let counter_1 = document.querySelector("#counter_1");
let counterUser1 = 0;
counter_1.innerHTML = counterUser1;

let counter_2 = document.querySelector("#counter_2");
let counterUser2 = 0;
counter_2.innerHTML = counterUser2;

/*Область итога игры*/
let gameE = document.getElementById("fin");
let counts = 0; //counterUser1 + counterUser2;

//создали Map допустимых значений  c ключами A0-G6 (для проверки формата ввода)
// и значениями 00-66(кодировка под Id) / ***Пример[A1 ; 00]****
let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
let number = [0, 1, 2, 3, 4, 5, 6];
let mapItem = new Map();
for (let i = 0; i < alphabet.length; i++) {
  for (let j = 0; j < number.length; j++) {
    let keyMap = alphabet[i] + number[j];
    let valueMap = number[i].toString() + number[j].toString();
    mapItem.set(keyMap, valueMap);
  }
}
/*слушаем кнопкуОГОНЬ*/ /*получаем координаты выстрела, проверяем их на валидность и очищаем окно ввода*/
let fireBtn1 = document.querySelector("#fireButton_1");
let fireBtn2 = document.querySelector("#fireButton_2");
let input1 = document.querySelector("#input_1");
let input2 = document.querySelector("#input_2");
let val1 = "";
let val2 = "";
let setShooter = new Set();
fireBtn1.addEventListener("click", valueFire1);
function valueFire1() {
  let valueFire1 = input1.value.toUpperCase();
  if (mapItem.has(valueFire1)) {
    if (!setShooter.has(valueFire1)) {
      setShooter.add(valueFire1);
      val1 = mapItem.get(valueFire1);    
      input1.value = "";

      if (shipsSet.has(val1)) {
        let resultat = document.getElementById([val1]);
        resultat.setAttribute("class", "ship");
        message1.innerHTML = "Попал!";
        message2.innerHTML = "ВАШ ход!!!";
        counterUser1 = counterUser1 + 1;
        counts = counts + 1;
        let audio2 = new Audio(); // Создаём новый элемент Audio
        audio2.src = "./audio/vyistrel.mp3";
        audio2.autoplay = true;
        fireBtn1.disabled = true;
        fireBtn2.disabled = false;

        if (counts === 19) {
          if (counterUser1 > counterUser2) {
            gameE.innerHTML = "ПОБЕДА!!! Игрок №1- чемпион!";
          } else {
            gameE.innerHTML = "ПОБЕДА!!! Игрок №2- чемпион!";
          }
          setInterval(() => (gameE.hidden = !gameE.hidden), 1000);
          let audio = new Audio();
          audio.src = "./audio/fanfary.mp3";
          audio.autoplay = true;
        }
        counter_1.innerHTML = counterUser1;
        return counterUser1;
      } else {
        let audio2 = new Audio();
        audio2.src = "./audio/water.mp3";
        audio2.autoplay = true;

        let resultat = document.getElementById([val1]);
        resultat.setAttribute("class", "fish");
        message1.innerHTML = "Мимо";
        message2.innerHTML = "ВАШ ход!!!";
        fireBtn1.disabled = true;
        fireBtn2.disabled = false;
        return counterUser1;
      }
    } else if (setShooter.has(valueFire1)) {
      alert("Поле ЗАНЯТО!");
    }
  } else {
    alert("Проверь формат ввода");
  }
}

fireBtn2.addEventListener("click", valueFire2);
function valueFire2() {
  let valueFire2 = input2.value.toUpperCase();
  if (mapItem.has(valueFire2)) {
    if (!setShooter.has(valueFire2)) {
      setShooter.add(valueFire2);
      val2 = mapItem.get(valueFire2);    
      input2.value = "";

      if (shipsSet.has(val2)) {
        let resultat = document.getElementById([val2]);
        resultat.setAttribute("class", "ship");
        message2.innerHTML = "Попал!";
        message1.innerHTML = "ВАШ ход!!!";
        counterUser2 = counterUser2 + 1;
        counts = counts + 1;
        let audio2 = new Audio();
        audio2.src = "./audio/vyistrel.mp3";
        audio2.autoplay = true;
        fireBtn2.disabled = true;
        fireBtn1.disabled = false;
        if (counts === 19) {
          if (counterUser1 > counterUser2) {
            gameE.innerHTML = "ПОБЕДА!!! Игрок №1- чемпион!";
          } else {
            gameE.innerHTML = "ПОБЕДА!!! Игрок №2- чемпион!";
          }
          setInterval(() => (gameE.hidden = !gameE.hidden), 1000);
          let audio = new Audio();
          audio.src = "./audio/fanfary.mp3";
          audio.autoplay = true;
        }
        counter_2.innerHTML = counterUser2;
        return counterUser2;
      } else {
        let resultat = document.getElementById([val2]);
        resultat.setAttribute("class", "fish");
        message2.innerHTML = "Мимо";
        message1.innerHTML = "ВАШ ход!!!";
        let audio2 = new Audio();
        audio2.src = "./audio/water.mp3";
        audio2.autoplay = true;
        fireBtn2.disabled = true;
        fireBtn1.disabled = false;
        return counterUser2;
      }
    } else if (setShooter.has(valueFire2)) {
      alert("Поле ЗАНЯТО!");
    }
  } else {
    alert("Проверь формат ввода");
  }
}

/*нажатие Enter*/
input1.addEventListener("keypress", validationPress1);
input2.addEventListener("keypress", validationPress2);

function validationPress1(event) {
  if (event.keyCode == 13) {
    valueFire1();
  }
}
function validationPress2(event) {
  if (event.keyCode == 13) {
    valueFire2();
  }
}

window.onload = generateShip();

