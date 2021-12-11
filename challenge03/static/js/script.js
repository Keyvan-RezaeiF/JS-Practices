function decideWinner(humanChoice, botChoice) {
    var rpsDB = {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissors': 1 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'rock': 0, 'paper': 1, 'scissors': 0.5 }
    };
    var humanScore = rpsDB[humanChoice][botChoice];
    var botScore = rpsDB[botChoice][humanChoice];
    return [humanScore, botScore];
}

function finalMessage([humanScore, botScore]) {
    if (humanScore === 0) {
        return {
            'message ': 'You lost!',
            'color': 'red'
        };
    } else if (humanScore === 0.5) {
        return {
            'message ': 'You tied!',
            'color': 'yellow'
        };
    } else {
        return {
            'message ': 'You Won!',
            'color': 'green'
        };
    }
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice);
    console.log(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    // rpsFrontEnd(yourChoice.id, botChoice, message);
}