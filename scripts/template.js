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
                        <img class="d-block w-100" src="./assets/${images[0]}" height="550px" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[1]}" height="550px" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[2]}" height="550px" alt="Third slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./assets/${images[3]}" height="550px" alt=" Fourth slide ">
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
