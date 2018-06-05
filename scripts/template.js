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
