const buttonsList = document.getElementsByClassName('button');
let infoContainer = document.getElementsByClassName('info-container')[0];

let player1 = true;
let player1Collection = {};
let player2Collection = {};
const Piece3Combinations = [
    ['button-row1-col1', 'button-row1-col4', 'button-row1-col7'],
    ['button-row2-col2', 'button-row2-col4', 'button-row2-col6'],
    ['button-row3-col3', 'button-row3-col4', 'button-row3-col5'],
    ['button-row4-col1', 'button-row4-col2', 'button-row4-col3'],
    ['button-row4-col5', 'button-row4-col6', 'button-row4-col7'],
    ['button-row5-col3', 'button-row5-col4', 'button-row5-col5'],
    ['button-row6-col2', 'button-row6-col4', 'button-row6-col6'],
    ['button-row7-col1', 'button-row7-col4', 'button-row7-col7'],

    ['button-row1-col1', 'button-row4-col1', 'button-row7-col1'],
    ['button-row2-col2', 'button-row4-col2', 'button-row6-col2'],
    ['button-row3-col3', 'button-row4-col3', 'button-row5-col3'],
    ['button-row1-col4', 'button-row2-col4', 'button-row3-col4'],
    ['button-row5-col4', 'button-row6-col4', 'button-row7-col4'],
    ['button-row3-col5', 'button-row4-col5', 'button-row5-col5'],
    ['button-row2-col6', 'button-row4-col6', 'button-row6-col6'],
    ['button-row1-col7', 'button-row4-col7', 'button-row7-col7'],
];
let currentlyRemovingAPiece = false;
let player1MoveSequence = [];
let player2MoveSequence = [];

initializePlayerCollections();


for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', (event) => {
        if (currentlyRemovingAPiece) {
            if(player1) {
                if(player2Collection[buttonsList[i].classList[1]].owned) {
                    // remove the piece
                    buttonsList[i].classList.remove('owned-by-player2');
                    player2Collection[buttonsList[i].classList[1]].owned = false;

                    // prepare for next turn
                    player1 = !player1;
                    changeInfoContainer();
                    currentlyRemovingAPiece = false;
                } else {
                    infoContainer.innerHTML = "Not owned by player 2";
                }
            } else {
                if(player1Collection[buttonsList[i].classList[1]].owned) {
                    // remove the piece
                    buttonsList[i].classList.remove('owned-by-player1');
                    player1Collection[buttonsList[i].classList[1]].owned = false;

                    // prepare for next turn
                    player1 = !player1;
                    changeInfoContainer();
                    currentlyRemovingAPiece = false;
                } else {
                    infoContainer.innerHTML = "Not owned by player 1";
                }
            }
        } else {
            try {
                if(player1Collection[buttonsList[i].classList[1]].owned || player2Collection[buttonsList[i].classList[1]].owned) {
                    infoContainer.innerHTML = "Already owned by a player";
                } else {
                    // do actions
                    colorTheButton.call(buttonsList[i]);
                    addButtonToOwned(buttonsList[i], player1);

                    if(checkFor3Pieces(player1)) {
                        currentlyRemovingAPiece = true;
                        return;
                    }

                    // prepare for next turn
                    player1 = !player1;
                    changeInfoContainer();
                }
            } catch (e) {
                infoContainer.innerHTML = e;
            }
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


function addButtonToOwned(button, player1) {
    if (player1) {
        player1Collection[button.classList[1]].owned = true;
        player1Collection[button.classList[1]].row = button.classList[1][10];
        player1Collection[button.classList[1]].col = button.classList[1][15];
    } else {
        player2Collection[button.classList[1]].owned = true;
        player2Collection[button.classList[1]].row = button.classList[1][10];
        player2Collection[button.classList[1]].col = button.classList[1][15];
    }
}


// ToDo: check for 3 pieces only against the latest button clicked!
function checkFor3Pieces(player1) {
    // check for 3 in a row
    if(player1) {
        // check the keys in player1Collection
        for (let key in player1Collection) {

            // check if the current key is owned
            if (player1Collection[key].owned) {
                // check if the current key is in the Piece3Combinations
                for (let i = 0; i < Piece3Combinations.length; i++) {
                    if (Piece3Combinations[i].includes(key)) {
                        // check if all 3 keys are owned
                        if (player1Collection[Piece3Combinations[i][0]].owned &&
                            player1Collection[Piece3Combinations[i][1]].owned &&
                            player1Collection[Piece3Combinations[i][2]].owned) {

                            // now check the player1WinSequence
                            if(!player1MoveSequence.includes(Piece3Combinations[i])){
                                player1MoveSequence.push(Piece3Combinations[i]);
                                return true;
                            }
                        }
                    }
                }
            }
        }
    } else {
        // check the keys in player2Collection
        for (let key in player2Collection) {

            // check if the current key is owned
            if (player2Collection[key].owned) {
                // check if the current key is in the Piece3Combinations
                for (let i = 0; i < Piece3Combinations.length; i++) {
                    if (Piece3Combinations[i].includes(key)) {
                        // check if all 3 keys are owned
                        if (player2Collection[Piece3Combinations[i][0]].owned &&
                            player2Collection[Piece3Combinations[i][1]].owned &&
                            player2Collection[Piece3Combinations[i][2]].owned) {

                            // now check the player2WinSequence
                            if(!player2MoveSequence.includes(Piece3Combinations[i])){
                                player2MoveSequence.push(Piece3Combinations[i]);
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
}
