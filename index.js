const buttonsList = document.getElementsByClassName('button');
let infoContainer = document.getElementsByClassName('info-container')[0];

let player1 = true;
let player1Collection = {};
let player2Collection = {};

initializePlayerCollections();
console.log(player1Collection);


for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', (event) => {
        try{
            colorTheButton.call(buttonsList[i]);
            logicController(buttonsList[i], player1);
            player1 = !player1;
            changeInfoContainer();
        } catch (e) {
            infoContainer.innerHTML = e;
        }
    });
}


function colorTheButton() {
    if (player1) {
        // remove a class
        this.classList.remove('owned-by-player2');
        // add a class
        this.classList.add('owned-by-player1');
    } else {
        // remove a class
        this.classList.remove('owned-by-player1');
        // add a class
        this.classList.add('owned-by-player2');
    }
}


function changeInfoContainer() {
    if (player1) {
        infoContainer.innerHTML = "Player 1's turn";
        infoContainer.classList.remove('player2-text');
        infoContainer.classList.add('player1-text');
    } else {
        infoContainer.innerHTML = "Player 2's turn";
        infoContainer.classList.remove('player1-text');
        infoContainer.classList.add('player2-text');
    }
}


function initializePlayerCollections() {
    for (let i = 0; i < buttonsList.length; i++) {
        const currentButton = buttonsList[i];
        const buttonRow = currentButton.classList[1][10]
        const buttonCol = currentButton.classList[1][15]

        player1Collection[buttonsList[i].classList[1]] = {
            owned: false,
            row: buttonRow,
            col: buttonCol,
        }

        player2Collection[buttonsList[i].classList[1]] = {
            owned: false,
            row: buttonRow,
            col: buttonCol,
        }
    }
}


function logicController(button, player1) {
    if(!checkIfNotAlreadyOwned(button, player1)){

    }



    checkFor3Pieces();
}

function checkIfNotAlreadyOwned(button, player1) {


}

function checkFor3Pieces() {
    // check for 3 in a row
    // check for 3 in a column
}

