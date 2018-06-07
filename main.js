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
                moves.innerHTML = 1;
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
        card.innerHTML = `<img class="catImage"  src="${imagePath}" width="250" height="150">`;
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
    let count=0;
    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            count = count+1
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
            setTimeout(function() {
                showResult(currentMoves, currentScore,count);
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
function showResult(currentMoves, currentScore,count) {
    let matchedCards = document.querySelectorAll(".match");
    let totalTime = document.querySelector(".timer").textContent;
    let resultWindow = document.createElement("div");
    resultWindow.classList.add("result-window");
    if (currentMoves === 0 || matchedCards.length === 16) {
        stopTimer();
        document.querySelector(".container-fluid").appendChild(resultWindow);

        if (matchedCards.length === 16) {
            resultWindow.innerHTML = template.congratsDetails(currentScore, matchedCards, currentMoves, totalTime,count);
            isChecked(currentScore);
        } else {
            resultWindow.innerHTML = template.improveDetails(currentScore, matchedCards, currentMoves, totalTime,count);
            isChecked(currentScore);
        }
        refresh();
        closeTab();
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
    console.log(playerNames)
    for (let playerName of playerNames) {
        // for (let key in players) {
        i++;
        let tr = document.createElement("tr");
        let th = document.createElement("th")
        th.setAttribute("scope", "row");
        th.textContent = i;
        let td1 = document.createElement("td");
        td1.innerHTML = playerName[0];
        let td2 = document.createElement("td");
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
