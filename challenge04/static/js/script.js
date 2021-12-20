var all_buttons = document.getElementsByTagName("button");

var copyALLButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyALLButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonColorRed();
    } else if (buttonThingy.value === 'green') {
        buttonColorGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        buttonColorRandom();
    }
}

function buttonColorRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonColorGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyALLButtons[i]);
    }
}

function buttonColorRandom() {
    var choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning'];
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        randomColor = choices[Math.floor(Math.random()*4)]
        all_buttons[i].classList.add(randomColor);
    }
}