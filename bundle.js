(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let images = require("./scripts/data");
let template = require("./scripts/template");
console.log(images);

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
                moves.innerHTML = 3;
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
        card.style.backgroundImage = `url("./assets/cardImage.jpg")`;
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
        card.innerHTML = `<img class="catImage"  src="${imagePath}" width="200" height="130">`;
    })

    //hide the cat images after a second
    setTimeout(hideCats, 500);
    gameWindow.style.display = "none";
}

showScore();

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
    let count = 0;
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
                    count = count + 1;
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
                        currentScore = currentScore + 200;
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
            setTimeout(function() {
                showResult(currentMoves, currentScore, count);
            }, 500);
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
        seconds = seconds + 1;
        timer.innerHTML = `${minutes} min ${seconds} sec`;
        // seconds = seconds + 1;
        if (seconds === 60) {
            minutes = minutes + 1;
            seconds = 0;
        }
    }, 998)
}

// Stop the timer
function stopTimer() {
    clearInterval(timeElapsed);
}

// Open the resultForm
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
        // closeTab();
    }
}

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
            // storeScore(currentScore);
        }
        refresh();
    })
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
        // for (let key in players) {
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


function refresh() {
    let playAgain = document.querySelector(".play-button");
    playAgain.addEventListener("click", () => {
        location.reload(true);
    })
}

function closeTab() {
    let close = document.querySelector(".close-icon");
    close.addEventListener("click", () => {
        closeWindow();
    })
}

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

function carousel(images) {
    let slideShowButton = document.querySelector(".show-slides");
    console.log(slideShowButton)
    slideShowButton.addEventListener("click", () => {
        document.querySelector(".container-fluid").innerHTML = template.slideShow(images);
        refresh();
    });
}

},{"./scripts/data":2,"./scripts/template":3}],2:[function(require,module,exports){
let images = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg"];
module.exports = images;

},{}],3:[function(require,module,exports){
let images = require("../scripts/data");

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
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="./assets/${images[0]}" height="600px" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[1]}" height="600px" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[2]}" height="600px" alt="Third slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[3]}" height="600px" alt=" Fourth slide ">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="./assets/${images[4]}" height="600px" alt="Fifth slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[5]}" height="600px" alt="Sixth slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src="./assets/${images[6]}" height="600px" alt="Seventh slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[7]}" height="600px" alt="Eighth slide">
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
        <div class="col-6 mx-auto">
          <input type="button" class="text-center result-font play-button btn btn-dark" name="playAgainButton" value="Play Again">
        </div>
    </div>
`
}

module.exports = {
    congratsDetails,
    improveDetails,
    slideShow
}

},{"../scripts/data":2}]},{},[1]);
