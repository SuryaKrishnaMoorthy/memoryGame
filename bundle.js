(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let images = require("./scripts/data");
let template = require("./scripts/template");

createBoard(16);
let cards = Array.from(document.querySelectorAll(".card"));
let levelButton = Array.from(document.querySelectorAll(".button-style"));
let gameWindow = document.querySelector(".game-window");
let moves = document.querySelector(".moves");
levelButton.forEach(button => {
    button.addEventListener("click", (event) => {
        switch (event.target.value) {
            case "0":
                document.querySelector(".moves").innerHTML = 35;
                break;
            case "1":
                moves.innerHTML = 20;
                break;
            case "2":
                moves.innerHTML = 10;
                break;
            default:
                break;
        }

        gameWindow.style.display = "none";
        populateBoard(duplicatedImages);

        showCatOnClick();
        startTimer();
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
        card.style.backgroundImage = `url("./assets/squirrel_pencil.jpg")`;
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
    setTimeout(hideCats, 500);
    gameWindow.style.display = "none";
}

// Show the cards when clicked

let canStartTurn = true;
let flippedCards = [];
let firstGuess = "";
let secondGuess = "";

function showCatOnClick() {
    movesValue = document.querySelector(".moves").textContent;
    let currentMoves = parseInt(movesValue);
    let score = document.querySelector(".scoreValue").textContent;
    let currentScore = parseInt(score);

    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            let catImage = (event.target.querySelector(".catImage"));
            // Ensure only 2 card is selected at a time
            if (flippedCards.length < 2) {

                // Save the first card
                if (flippedCards.length === 0 && canStartTurn) {
                    if (catImage.classList.contains("catImageHide")) {
                        catImage.classList.remove("catImageHide");
                    }
                    firstGuess = catImage;
                    flippedCards.push(firstGuess);

                    // Save the second card
                } else if (flippedCards.length === 1 && canStartTurn) {
                    if (!catImage.classList.contains("match")) {
                        currentMoves = (currentMoves <= 0) ? 0 : currentMoves - 1;
                        moves.innerHTML = currentMoves;
                    }
                    if (catImage.classList.contains("catImageHide")) {
                        catImage.classList.remove("catImageHide");
                    }
                    secondGuess = catImage;
                    flippedCards.push(secondGuess);

                    // Check if two cards are a match
                    if (firstGuess.getAttribute("src") === secondGuess.getAttribute("src")) {
                        firstGuess.classList.add("match");
                        secondGuess.classList.add("match");
                        currentScore = currentScore + 100;
                        document.querySelector(".scoreValue").innerHTML = currentScore;
                        canStartTurn = false;
                        setTimeout(() => {
                            canStartTurn = true;
                        }, 1000)

                        // Reset the cards array after a match for next set of cards
                        flippedCards = [];
                    } else {

                        // Show the second card and then flip it.
                        catImage.classList.remove("catImageHide");
                        setTimeout(function() {
                            firstGuess.classList.add("catImageHide");
                            secondGuess.classList.add("catImageHide");

                            // Reset the cards array for next set of cards if it is not matched
                            flippedCards = [];
                            canStartTurn = true;
                        }, 500);

                    }
                }
            }
            showResult(currentMoves, currentScore);
            // console.log(currentMoves)
        })
    })
}

// Start timer function
let minutes = 0;
let seconds = 0;
let timer = document.querySelector(".timer");
let timeElapsed;

function startTimer() {
    timeElapsed = setInterval(() => {
        timer.innerHTML = `${minutes} min ${seconds} sec`;
        seconds = seconds + 1;
        if (seconds === 60) {
            minutes = minutes + 1;
            seconds = 0;
        }
    }, 1000)
}

// Stop the timer
function stopTimer() {
    clearInterval(timeElapsed);
}

// Open the resultForm
function showResult(currentMoves, currentScore) {
    let matchedCards = document.querySelectorAll(".match");
    let totalTime = document.querySelector(".timer").textContent;
    let resultWindow = document.querySelector(".result-window");
    if (currentMoves === 0 || matchedCards.length === 16) {
        stopTimer();
        if (matchedCards.length === 16) {
            resultWindow.innerHTML = template.congratsDetails(currentScore, matchedCards, currentMoves, totalTime);
        } else {
            resultWindow.innerHTML = template.improveDetails(currentScore, matchedCards, currentMoves, totalTime);
        }
        let name = document.createElement("input");
        name.classList.add("playerName");
        let checkbox = document.querySelector(".saveName");
        if (checkbox.checked) {
            document.querySelector(".saveDetails").append(name);
        }

    }
}

},{"./scripts/data":2,"./scripts/template":3}],2:[function(require,module,exports){
let images = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg"];
module.exports = images;

},{}],3:[function(require,module,exports){
const congratsDetails = (currentScore, matchedCards, currentMoves, totalTime) => {
    return `
<div class="congratsDetails">
    <h2>Congratulations!!!</h2>
    <a class="close-icon" href=#>X</a>
    <h3>Great Job!!</h3>
    <div class="congrats-content">
        <p>Your Score:  <span class="result-font currentScore">${currentScore} points,</span></p>
        <p>You matched <span class="result-font matched-cards">${matchedCards.length} cards,</span></p>
        <p>using <span class="result-font moves"> ${currentMoves} moves,</span></p>
        <p>in <span class="result-font total-time"> ${totalTime}</span>
    </div>
    <div class="saveDetails">
        <label for="saveName">Do you want to save your score?
        </label>
        <input type="checkbox" class="saveName" name="saveName" id="saveName" value="name">
    </div>
    <input type="button" class="result-font play-button" name="playAgainButton" value="Play Again">
</div>`
}

const improveDetails = (currentScore, matchedCards, currentMoves, totalTime) => {
    return `
<div class="improveDetails">
    <h2>Hmmmm...Focus more..You can do it!!!</h2>
    <a class="close-icon" href=#>X</a>
    <div class="congrats-content">
        <p>Your Score:  <span class="result-font currentScore">${currentScore} points,</span></p>
        <p>You matched <span class="result-font matched-cards">${matchedCards.length} cards,</span></p>
        <p>using <span class="result-font moves"> ${16-currentMoves} moves,</span></p>
        <p>in <span class="result-font total-time"> ${totalTime}</span>
    </div>
    <div class="saveDetails">
        <label for="saveName">Do you want to save your score?
        </label>
        <input type="checkbox" class="saveName" name="saveName" id="saveName" value="name">
    </div>
    <input type="button" class="result-font play-button" name="playAgainButton" value="Play Again">
</div>`
}
module.exports = {
    congratsDetails,
    improveDetails
}

},{}]},{},[1]);
