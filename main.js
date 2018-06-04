let images = ["100.jpg", "101.jpg", "200.jpg", "201.jpg", "202.jpg", "204.jpg", "206.jpg", "207.jpg", "207.jpg", "207.jpg"];

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
  })
})

function createBoard(levelNumber) {
  for (let i = 0; i < levelNumber; i++) {
    let gameBoard = document.querySelector(".gameBoard");
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img   src="http://sci.esa.int/science-e-media/img/7d/heic1211a_screen.jpg" width="150" height="150">`
    gameBoard.appendChild(card);
  }
}
createBoard(16);
//
// function randomizeArray(images, levelNumber){
//   let randomizedArray = [];
//   for(let i = 0 ;i < levelNumber/2; i++){
//     let index = Math.floor(Math.random()* images.length);
//     randomizedArray.push(images[index]);
//   }
//   return randomizedArray;
// }
//
const duplicatedImages = images.push(...images);

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
console.log(shuffleArray(images));


function populateBoard() {
  let cards = Array.from(document.querySelectorAll(".card"));
  cards
}
