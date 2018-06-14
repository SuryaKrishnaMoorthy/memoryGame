(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let images = require("./scripts/data");
let template = require("./scripts/template");

let gameWindow = document.querySelector(".game-window");
let canStartTurn = false;

/* Create number of cards w.r.to the level number specified */
function createBoard(levelNumber) {
    for (let i = 0; i < levelNumber; i++) {
        let gameBoard = document.querySelector(".gameBoard");
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.backgroundImage = `url("./assets/cardImage.jpg")`;
        let imagePath = `./assets/${images[i]}`;
        card.innerHTML = `<img class="catImage catImageHide"  src="${imagePath}" width="200" height="130">`;
        gameBoard.appendChild(card);
    }
}
createBoard(16);

/* Show score board */
function sortScore(players) {
    var sortable = [];
    for (let name in players) {
        sortable.push([name, players[name]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortable;
}

function showScore() {
    const players = JSON.parse(localStorage.getItem("game"));
    let tbody = document.querySelector("tbody");
    if (tbody.hasChildNodes()) {
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
    let i = 0;
    let playerNames = sortScore(players);
    for (let playerName of playerNames) {
        i++;
        let tr = document.createElement("tr");
        let th = document.createElement("th")
        th.setAttribute("scope", "row");
        th.textContent = i;
        let td1 = document.createElement("td");
        td1.innerHTML = playerName[0];
        let td2 = document.createElement("td")
        td2.style.color = "sandybrown";
        td2.innerHTML = playerName[1];
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }
}
showScore();

/* Set cards face down */
let cards = Array.from(document.querySelectorAll(".card"));

function populateBoard(images) {
    cards.forEach((card) => {
        card.classList.add("image-animate");
        setTimeout(() => {
            let catImage = (card.querySelector(".catImage"));
            catImage.classList.remove("catImageHide");
            setTimeout(() => {
                catImage.classList.add("catImageHide");
            }, 750);
        }, 125);
    });
}

/* Function to store the top score */
function storeScore(currentScore) {
    const players = JSON.parse(localStorage.getItem("game"));
    let save = document.querySelector(".save");
    save.addEventListener("click", () => {
        let name = document.querySelector("#name").value;
        if (!players) {
            let players = {};
            players[name] = currentScore;
            localStorage.setItem("game", JSON.stringify(players));
        }
        if (players[name]) {
            players[name] = parseInt(players[name]) < currentScore ? currentScore : parseInt(players[name]);
        } else {
            players[name] = currentScore;
        }
        localStorage.setItem("game", JSON.stringify(players));
        let saveWindow = document.querySelector(".saveDetails");
        saveWindow.style.display = 'none';
        showScore();
    });
}



/* Stop the timer when game over */
function stopTimer() {
    clearInterval(timeElapsed);
}

/* Function to enter name to store score */
function isChecked(currentScore) {
    let checkbox = document.querySelector(".saveName");
    let name = document.querySelector(".name");
    checkbox.addEventListener('change', function(event) {
        event.preventDefault()
        let isChecked = checkbox.checked;
        if (isChecked) {
            name.style.display = 'block'
            storeScore(currentScore);
        } else {
            name.style.display = 'none'
        }
    })
}

/* Function to reload the game */
function refresh() {
    let playAgain = document.querySelector(".play-button");
    playAgain.addEventListener("click", () => {
        location.reload(true);
    })
}

/* Show the image - slide show */
function carousel(images) {

    // Filter to get unique images
    images = images.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
    let slideShowButton = document.querySelector(".show-slides");
    slideShowButton.addEventListener("click", () => {
        document.querySelector(".container-fluid").innerHTML = template.slideShow(images);
        setTimeout(() => {
            $(".carousel").carousel();
        }, 100);
        refresh();
    });
}

/* Open the result form */
function showResult(currentMoves, currentScore, count) {
    let matchedCards = document.querySelectorAll(".match");
    let totalTime = document.querySelector(".timer").textContent;
    let resultWindow = document.createElement("div");
    resultWindow.classList.add("result-window");
    if (currentMoves === 0 || matchedCards.length === 16) {
        stopTimer();
        document.querySelector(".container-fluid").appendChild(resultWindow);
        if (matchedCards.length === 16) {
            resultWindow.innerHTML = template.congratsDetails(currentScore, matchedCards, currentMoves, totalTime, count);
            isChecked(currentScore);
            carousel(images);
        } else {
            resultWindow.innerHTML = template.improveDetails(currentScore, matchedCards, currentMoves, totalTime, count);
            isChecked(currentScore);
            carousel(images);
        }
        refresh();
    }
}

/* Show the card when clicked on them */
let flippedCards = [];
let firstGuess = "";
let firstGuessParent = "";
let secondGuess = "";
let secondGuessParent = "";

function showCatOnClick() {

    // First remove the animate class;
    cards.forEach((card) => {
        card.classList.remove("image-animate");
    });
    movesValue = document.querySelector(".moves").textContent;
    let currentMoves = parseInt(movesValue);
    let score = document.querySelector(".scoreValue").textContent;
    let currentScore = parseInt(score);
    let count = 0;
    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            let catImage = (event.target.querySelector(".catImage"));

            // Ensure only 2 card is selected at a time
            if (catImage) {
                if (flippedCards.length < 2) {

                    // Save the first card
                    if (flippedCards.length === 0 && canStartTurn) {
                        if (catImage.classList.contains("catImageHide")) {
                            event.target.classList.add("image-animate-show");
                            setTimeout(() => {
                                catImage.classList.remove("catImageHide");
                            }, 125);
                        }
                        firstGuess = catImage;
                        firstGuessParent = event.target;
                        flippedCards.push(firstGuess);
                    } else if (flippedCards.length === 1 && canStartTurn) {

                        // Save the second card
                        count = count + 1;
                        if (!catImage.classList.contains("match")) {
                            currentMoves = (currentMoves <= 0) ? 0 : currentMoves - 1;
                            moves.innerHTML = currentMoves;
                        }
                        if (catImage.classList.contains("catImageHide")) {
                            event.target.classList.add("image-animate-show");
                            setTimeout(() => {
                                catImage.classList.remove("catImageHide");
                            }, 125);
                        }
                        secondGuess = catImage;
                        secondGuessParent = event.target;
                        flippedCards.push(secondGuess);

                        // Check if two cards are a match
                        if (firstGuess.getAttribute("src") === secondGuess.getAttribute("src")) {
                            firstGuess.classList.add("match");
                            secondGuess.classList.add("match");
                            currentScore = currentScore + 200;
                            document.querySelector(".scoreValue").innerHTML = currentScore;
                            canStartTurn = false;
                        } else {

                            // Show the second card and then flip it.
                            setTimeout(() => {
                                firstGuess.classList.add("catImageHide");
                                secondGuess.classList.add("catImageHide");
                                firstGuessParent.classList.remove("image-animate-show");
                                secondGuessParent.classList.remove("image-animate-show");
                            }, 500);
                        }

                        // Reset the cards array
                        setTimeout(() => {
                            flippedCards = [];
                            canStartTurn = true;
                        }, 500);
                    }
                }
            }
            setTimeout(function() {
                showResult(currentMoves, currentScore, count);
            }, 500);
        })
    })
}

/* Start timer function */
let minutes = 0;
let seconds = 0;
let timer = document.querySelector(".timer");
let timeElapsed;

function startTimer() {
    timeElapsed = setInterval(() => {
        seconds = seconds + 1;
        timer.innerHTML = `${minutes} min ${seconds} sec`;
        // seconds = seconds + 1;
        if (seconds === 60) {
            minutes = minutes + 1;
            seconds = 0;
        }
    }, 750)
}

/* Set the number of moves based on level */
let moves = document.querySelector(".moves");
let levelButton = Array.from(document.querySelectorAll(".button-style"));
levelButton.forEach(button => {
    button.addEventListener("click", (event) => {
        switch (event.target.value) {
            case "0":
                moves.innerHTML = 30;
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
        populateBoard(images);
        setTimeout(() => {
            canStartTurn = true;
            showCatOnClick();
            startTimer();
        }, 1000);
    })
});

},{"./scripts/data":2,"./scripts/template":3}],2:[function(require,module,exports){
let imagesArray = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg", "300.jpg", "301.jpg", "302.jpg", "303.jpg", "304.jpg", "305.jpg", "307.jpg", "400.jpg", "401.jpg", "402.jpg", "403.jpg", "404.jpg", "405.jpg", "406.jpg", "408.jpg", "409.jpg", "410.jpg", "411.jpg", "412.jpg", "413.jpg", "414.jpg", "415.jpg", "416.jpg", "417.jpg", "418.jpg", "420.jpg", "421.jpg", "423.jpg", "424.jpg", "425.jpg", "426.jpg", "427.jpg", "431.jpg", "444.jpg", "450.jpg", "451.jpg", "500.jpg", "502.jpg", "503.jpg", "504.jpg", "506.jpg", "507.jpg", "508.jpg", "509.jpg", "511.jpg", "599.jpg"];

/* Function to generate random 8 indexes for fetching images from the main images array */
function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Select random 8 images */
let imageSet = new Set();
let images = new Array();
do {
    imageSet.add(getRandomIndex(0, (imagesArray.length - 1)));
}
while (imageSet.size < 8);
imageSet.forEach(value => {
    images.push(imagesArray[value]);
});

// Create an array with images duplicated
const duplicatedImages = [...images, ...images];

// Shuffle the images
function shuffleArray(duplicatedImages) {
    for (let i = duplicatedImages.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = duplicatedImages[randomIndex];
        duplicatedImages[randomIndex] = duplicatedImages[i];
        duplicatedImages[i] = itemAtIndex;
    }
    return duplicatedImages;
}

images = shuffleArray(duplicatedImages);

module.exports = images;

},{}],3:[function(require,module,exports){
const congratsDetails = (currentScore, matchedCards, currentMoves, totalTime, count) => {
    return `
<div class="congratsDetails">
    <h2>Congratulations!!!</h2>
    <div class="congrats-content text-center">
        <p>Your Score:  <span class="result-font currentScore">${currentScore} points,</span></p>
        <p>You matched <span class="result-font matched-cards">${matchedCards.length} cards,</span></p>
        <p>using <span class="result-font moves"> ${count} moves,</span></p>
        <p>in <span class="result-font total-time"> ${totalTime}</span>
    </div>
    <div class="saveDetails text-center">
        <label for="saveName">Do you want to save your score?
        </label>
        <input type="checkbox" class="saveName" name="saveName" id="saveName" value="name">
        <div class="name" style="display:none;">
            <label for="name">Enter your name: </label>
            <input type="text" required id="name" class="userName" name="name"  placeholder="Enter your name">
            <input type="button" class="save" style="sandybrown" value="Save">
        </div>
    </div>
    <br>
    <input type="button" class="result-font play-button btn btn-dark" name="playAgainButton" value="Play Again">
    <br>
    <input type="button" class="show-slides result-font play-button btn btn-dark" name="" value="Show images">
</div>`
}

const improveDetails = (currentScore, matchedCards, currentMoves, totalTime, count) => {
    return `
<div class="improveDetails">
    <h2>Hmm... Focus.. You can do it!!!</h2>
    <div class="congrats-content">
        <p>Your Score:  <span class="result-font currentScore">${currentScore} points,</span></p>
        <p>You matched <span class="result-font matched-cards">${matchedCards.length} cards,</span></p>
        <p>using <span class="result-font moves"> ${count} moves,</span></p>
        <p>in <span class="result-font total-time"> ${totalTime}</span>
    </div>
    <div class="saveDetails text-center">
        <label for="saveName">Do you want to save your score?
        </label>
        <input type="checkbox" class="saveName" name="saveName" id="saveName" value="name">
        <div class="name" style="display:none;">
            <label for="name">Enter your name: </label>
            <input type="text" required id="name" class="userName" name="name" placeholder="Enter your name">
            <input type="button" class="save" value="Save" style="sandybrown">
        </div>
    </div>
    <br>
    <input type="button" class="result-font play-button btn btn-dark" name="playAgainButton" value="Play Again">
    <br>
    <input type="button" class="show-slides result-font play-button btn btn-dark" name="" value="Show images">
</div>`
}

const slideShow = (images) => {
    return `
    <div class="row">
      <div class="col-6 mx-auto">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="1500">
                <ul class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
                </ul>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="./assets/${images[0]}" height="550px" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[1]}" height="550px" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[2]}" height="550px" alt="Third slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[3]}" height="550px" alt="Fourth slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[4]}" height="550px" alt="Fifth slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[5]}" height="550px" alt="Sixth slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[6]}" height="550px" alt="Seventh slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[7]}" height="550px" alt="Eighth slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
            </div>
      </div>
    </div>
    <div class="row">
        <div class="col-12 mt-3 image-play">
          <input type="button" class="result-font play-button btn btn-dark" name="playAgainButton" value="Play Again">
        </div>
    </div>
`
}

module.exports = {
    congratsDetails,
    improveDetails,
    slideShow
}

},{}]},{},[1]);
