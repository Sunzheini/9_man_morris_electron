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

const player1Ul = document.getElementsByClassName('ul-player1')[0];
const player2Ul = document.getElementsByClassName('ul-player2')[0];
let player1LisArray = Array.from(player1Ul.children);
let player2LisArray = Array.from(player2Ul.children);

let player1PiecesLeft = 9;
let player2PiecesLeft = 9;
let phase2 = false;
let waitingForMovement = false;
let buttonWaitingForMovement = null;

initializePlayerCollections();


for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', (event) => {
        // -------------------------------------------------------------------------------------------
        // phase 2b
        if (phase2) {
            if(waitingForMovement){
                if(player1){
                    const possibleMovementPositionsList = calculatePossibleMovementPositions(buttonWaitingForMovement);

                    // check if the clicked button is in the possible movement positions
                    if(possibleMovementPositionsList.includes(buttonsList[i].classList[1])){
                        // do actions

                        // ToDo

                    } else {
                        infoContainer.innerHTML = "Not a possible movement";
                    }

                    waitingForMovement = false;
                } else {
                    const possibleMovementPositionsList = calculatePossibleMovementPositions(buttonWaitingForMovement);

                    waitingForMovement = false;
                }
            }

        // -------------------------------------------------------------------------------------------
        // phase 2a
            else {
                if(player1) {
                // if clicked on his own piece
                if (player1Collection[buttonsList[i].classList[1]].owned) {
                    waitingForMovement = true;
                    buttonWaitingForMovement = buttonsList[i].classList[1];
                    infoContainer.innerHTML = "Move your piece";
                    return;
                    }
                }
            }
        }

        // -------------------------------------------------------------------------------------------
        // phase 1b
        if (currentlyRemovingAPiece) {
            if (player1) {
                if (player2Collection[buttonsList[i].classList[1]].owned) {
                    // check if it is not a part of a 3 in a row owned by the player so its locked
                    if(isPartOf3InARow(buttonsList[i].classList[1])){
                        infoContainer.innerHTML = "Part of 3 in a row";
                        return;
                    }

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
                if (player1Collection[buttonsList[i].classList[1]].owned) {
                    // check if it is not a part of a 3 in a row owned by the player so its locked
                    if(isPartOf3InARow(buttonsList[i].classList[1])){
                        infoContainer.innerHTML = "Part of 3 in a row";
                        return;
                    }

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
        // -------------------------------------------------------------------------------------------
        // phase 1a
        } else {
            try {
                if (player1Collection[buttonsList[i].classList[1]].owned || player2Collection[buttonsList[i].classList[1]].owned) {
                    infoContainer.innerHTML = "Already owned by a player";
                } else {
                    // do actions
                    colorTheButton.call(buttonsList[i]);
                    addButtonToOwned(buttonsList[i], player1);

                    // expend a piece
                    if (player1) {
                        player1PiecesLeft--;
                        // delete last li
                        player1Ul.removeChild(player1LisArray[player1PiecesLeft]);
                    } else {
                        player2PiecesLeft--;
                        // delete last li
                        player2Ul.removeChild(player2LisArray[player2PiecesLeft]);
                    }

                    if (player1) {
                        player1MoveSequence.push(buttonsList[i].classList[1]);
                    } else {
                        player2MoveSequence.push(buttonsList[i].classList[1]);
                    }

                    if (checkFor3Pieces(player1)) {
                        currentlyRemovingAPiece = true;
                        return;
                    }

                    // check if phase 2
                    if (player1PiecesLeft === 0 && player2PiecesLeft === 0) {
                        phase2 = true;
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


function checkFor3Pieces(player1) {
    // check for 3 in a row
    if (player1) {
        const lastButtonClicked = player1MoveSequence[player1MoveSequence.length - 1];

        // check if the current key is in the Piece3Combinations
        for (let i = 0; i < Piece3Combinations.length; i++) {
            if (Piece3Combinations[i].includes(lastButtonClicked)) {
                // check if all 3 keys are owned
                if (player1Collection[Piece3Combinations[i][0]].owned &&
                    player1Collection[Piece3Combinations[i][1]].owned &&
                    player1Collection[Piece3Combinations[i][2]].owned) {

                    return true;
                }
            }
        }
    } else {
        const lastButtonClicked = player2MoveSequence[player2MoveSequence.length - 1];

        // check if the current key is in the Piece3Combinations
        for (let i = 0; i < Piece3Combinations.length; i++) {
            if (Piece3Combinations[i].includes(lastButtonClicked)) {
                // check if all 3 keys are owned
                if (player2Collection[Piece3Combinations[i][0]].owned &&
                    player2Collection[Piece3Combinations[i][1]].owned &&
                    player2Collection[Piece3Combinations[i][2]].owned) {

                    return true;
                }
            }
        }
    }
    return false;
}


function isPartOf3InARow(button){
    if(player1){
        for (let i = 0; i < Piece3Combinations.length; i++) {
            if (Piece3Combinations[i].includes(button)) {
                // check if all 3 keys are owned by player 2
                if (player2Collection[Piece3Combinations[i][0]].owned &&
                    player2Collection[Piece3Combinations[i][1]].owned &&
                    player2Collection[Piece3Combinations[i][2]].owned) {

                    return true;
                }
            }
        }
    } else {
        for (let i = 0; i < Piece3Combinations.length; i++) {
            if (Piece3Combinations[i].includes(button)) {
                // check if all 3 keys are owned by player 1
                if (player1Collection[Piece3Combinations[i][0]].owned &&
                    player1Collection[Piece3Combinations[i][1]].owned &&
                    player1Collection[Piece3Combinations[i][2]].owned) {

                    return true;
                }
            }
        }
    }
    return false;
}


function calculatePossibleMovementPositions(button) {
    const possibleMovementPositionsList = [];

    // check if the current key is in the Piece3Combinations
    for (let i = 0; i < Piece3Combinations.length; i++) {
        if (Piece3Combinations[i].includes(button)) {
            // check position of the button inside the combination
            const buttonPosition = Piece3Combinations[i].indexOf(button);

            // check if the button on the right is free and existing
            if(buttonPosition !== 2){
                const buttonOnTheRight = Piece3Combinations[i][buttonPosition + 1];
                if(!player1Collection[buttonOnTheRight].owned && !player2Collection[buttonOnTheRight].owned){
                    // check if not already in the list
                    if(!possibleMovementPositionsList.includes(buttonOnTheRight)){
                        possibleMovementPositionsList.push(buttonOnTheRight);
                    }
                }// check if the button on the left is free and existing
            } else if(buttonPosition !== 0){
                const buttonOnTheLeft = Piece3Combinations[i][buttonPosition - 1];
                if(!player1Collection[buttonOnTheLeft].owned && !player2Collection[buttonOnTheLeft].owned){
                    // check if not already in the list
                    if(!possibleMovementPositionsList.includes(buttonOnTheLeft)){
                        possibleMovementPositionsList.push(buttonOnTheLeft);
                    }
                }
            } else {
                console.log('error');
            }
        }
    }
    return possibleMovementPositionsList;
}
