let images = require("./scripts/data");
// let images = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg", "207.jpg", "207.jpg"];

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

    // console.log(populateBoard(duplicatedImages))
    // let cards = Array.from(document.querySelectorAll(".card"));
  })
})
//function to hide the cat images from game board
function hideCats(){
  let catImage = Array.from(document.querySelectorAll(".catImage"));
  catImage.forEach((cat) => {
    cat.classList.add("cardImage");
  })
}

//create the cards in the div and set the default image when card in faced down
function createBoard(levelNumber) {
  for (let i = 0; i < levelNumber; i++) {
    let gameBoard = document.querySelector(".gameBoard");
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.backgroundImage = `url("http://sci.esa.int/science-e-media/img/7d/heic1211a_screen.jpg")`;
    // console.log(card);
    gameBoard.appendChild(card);
  }
}
createBoard(16);

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
// console.log(duplicatedImages);

//set the images of the card as cats.
let cards = Array.from(document.querySelectorAll(".card"));

function populateBoard(duplicatedImages) {
  let shuffledArray = shuffleArray(duplicatedImages);
  cards.forEach((card,index) => {
    let imagePath = `./assets/${shuffledArray[index]}`;
    card.innerHTML = `<img class="catImage"  src="${imagePath}" width="150" height="150">`;
  })
  //hides the cat images after a second
  setTimeout(hideCats, 1000);
  gameWindow.style.display = "none";
}
