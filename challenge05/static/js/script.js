let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'draws': 0,
    'losses': 0,
    'isStand': false,
    'isTurnsOver': false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', handleDealer);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

function blackJackHit() {
    if (blackJackGame['isStand'] === false) {
        let card = chooseRandomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function chooseRandomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/' + card + '.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackJackDeal() {
    if (blackJackGame['isTurnsOver'] === true) {
        blackJackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        YOU['score'] = 0;
        DEALER['score'] = 0;
        showScore(YOU);
        showScore(DEALER);

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackJackGame['isTurnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleDealer() {
    blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackJackGame['isStand'] === true) {
        let card = chooseRandomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackJackGame['isTurnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
            blackJackGame['wins']++
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackJackGame['losses']++
        } else if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackJackGame['losses']++
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['draws']++
    }

    return winner;
}

function showResult(winner) {
    if (blackJackGame['isTurnsOver'] === true) {
        let message, messageColor;

        if (winner === YOU) {
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

        document.querySelector('#wins').textContent = blackJackGame['wins'];
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        document.querySelector('#losses').textContent = blackJackGame['losses'];
    }
}
