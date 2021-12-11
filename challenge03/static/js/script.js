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
            'message': 'You lost!',
            'color': 'red'
        };
    } else if (humanScore === 0.5) {
        return {
            'message': 'You tied!',
            'color': 'yellow'
        };
    } else {
        return {
            'message': 'You Won!',
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

function rpsFrontEnd(humanChoice, botChoice, message) {
    var imagesDB = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src,
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDB[humanChoice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);

    messageDiv.innerHTML = "<h1 style='color: " + message['color'] + "; font-size: 60px; padding: 30px;'>" + message['message'] + "</h1>";
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    botDiv.innerHTML = "<img src='" + imagesDB[botChoice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());

    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);
}