let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
}

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);

const hitSound = new Audio('static/sounds/swish.m4a');

function blackJackHit() {
    let card = chooseRandomCard();
    showCard(card, YOU);
}

function chooseRandomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = 'static/images/' + card + '.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackJackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }
}