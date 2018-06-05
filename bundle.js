(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let images = require("./scripts/data");

createBoard(16);
let cards = Array.from(document.querySelectorAll(".card"));
let levelButton = Array.from(document.querySelectorAll(".button-style"));
let gameWindow = document.querySelector(".game-window");
let moves = document.querySelector(".moves");
levelButton.forEach(button => {
  button.addEventListener("click", (event) => {
    switch (event.target.value) {
      case "0":
        document.querySelector(".moves").innerHTML = 40;
        break;
      case "1":
        moves.innerHTML = 30;
        break;
      case "2":
        moves.innerHTML = 20;
        break;
      default:
        break;
    }

    gameWindow.style.display = "none";
    populateBoard(duplicatedImages);

    showCatOnClick();
  })
})
//function to hide the cat images from game board
function hideCats() {
  let catImages = Array.from(document.querySelectorAll(".catImage"));
  catImages.forEach((catImage) => {
    catImage.classList.add("catImageHide");
  })
}

//create the cards in the div and set the default image when card in faced down
function createBoard(levelNumber) {
  for (let i = 0; i < levelNumber; i++) {
    let gameBoard = document.querySelector(".gameBoard");
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url("http://sci.esa.int/science-e-media/img/7d/heic1211a_screen.jpg")`;
    gameBoard.appendChild(card);
  }
}

//shuffle the images
function shuffleArray(images) {
  for (let i = images.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = images[randomIndex];

    images[randomIndex] = images[i];
    images[i] = itemAtIndex;
  }
  return images;
}

//create an array with images duplicated
const duplicatedImages = [...images, ...images];

//set the images of the card as cats.
function populateBoard(duplicatedImages) {
  let shuffledArray = shuffleArray(duplicatedImages);
  cards.forEach((card, index) => {
    let imagePath = `./assets/${shuffledArray[index]}`;
    card.innerHTML = `<img class="catImage"  src="${imagePath}" width="150" height="150">`;
  })
  //hides the cat images after a second
  setTimeout(hideCats, 1000);
  gameWindow.style.display = "none";
}

let flippedCards = [];
let firstGuess = "";
let secondGuess = "";

function showCatOnClick() {
  movesValue = document.querySelector(".moves").textContent;
  let currentMoves = parseInt(movesValue);
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      let catImage = (event.target.querySelector(".catImage"));

      if (flippedCards.length < 2) {
        if (flippedCards.length === 0) {
          if (catImage.classList.contains("catImageHide")) {
            catImage.classList.remove("catImageHide");
          }
          firstGuess = catImage;

          flippedCards.push(firstGuess);
        } else if (flippedCards.length === 1) {
          currentMoves= currentMoves-1;
          moves.innerHTML = currentMoves;
          if (catImage.classList.contains("catImageHide")) {
            catImage.classList.remove("catImageHide");
          }
          secondGuess = catImage;
          flippedCards.push(secondGuess);
          if (firstGuess.getAttribute("src") === secondGuess.getAttribute("src")) {
            firstGuess.classList.add("match");
            secondGuess.classList.add("match");
            flippedCards=[];
          } else {
            catImage.classList.remove("catImageHide");
            setTimeout(function(){
              firstGuess.classList.add("catImageHide");
              secondGuess.classList.add("catImageHide");
            },1000);
            flippedCards=[];
          }
        }
      }
    })
  })
}

},{"./scripts/data":2}],2:[function(require,module,exports){
let images = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg"];
module.exports = images;

},{}]},{},[1]);
