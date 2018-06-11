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
