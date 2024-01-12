import Piece3Combinations from "./piece3CombinationsList.js";

/**
 * Initializes the player collections with the buttons with owned: false
 * key is the 2nd class of the button, i.e. `button-row1-col4` and
 * value is an object with the following properties:
 * - owned: boolean
 * - row: string
 * - col: string
 * @param {Array<HTMLElement>} buttonsList - The list of buttons.
 * @param {{}} player1PlacedPiecesCollection - The collection of the buttons placed by player 1.
 * @param {{}} player2PlacedPiecesCollection - The collection of the buttons placed by player 2.
 * @returns {void}
 */
export function initializePlayerCollectionsWithOwnedFalse(buttonsList, player1PlacedPiecesCollection, player2PlacedPiecesCollection) {
    for (let i = 0; i < buttonsList.length; i++) {
        const currentButton = buttonsList[i];
        const buttonRow = currentButton.classList[1][10]
        const buttonCol = currentButton.classList[1][15]

        player1PlacedPiecesCollection[buttonsList[i].classList[1]] = {
            owned: false,
            row: buttonRow,
            col: buttonCol,
        }

        player2PlacedPiecesCollection[buttonsList[i].classList[1]] = {
            owned: false,
            row: buttonRow,
            col: buttonCol,
        }
    }
}

/**
 * Writes a message to a DOM element.
 * @param message string
 * @param place HTMLElement
 * @param itsPlayer1sTurn boolean
 * @returns {void}
 */
export function writeMessageTo(message, place, itsPlayer1sTurn) {
    if (itsPlayer1sTurn) {
        place.classList.remove('player2-text');
        place.classList.add('player1-text');
    } else {
        place.classList.remove('player1-text');
        place.classList.add('player2-text');
    }
    place.innerHTML = message;
}

/**
 * Checks if the button is owned by the player and returns a boolean.
 * @param buttonClass
 * @param playerPlacedPiecesCollection
 * @returns {boolean|*}
 */
export function isOwnedPieceSelected(buttonClass, playerPlacedPiecesCollection){
    return playerPlacedPiecesCollection[buttonClass].owned;
}

/**
 * Checks if the button is part of a 3 in a row owned by the player and returns a boolean.
 * @param button HTMLElement
 * @param playerPlacedPiecesCollection {{}}
 * @returns {boolean} true if the button is part of a 3 in a row owned by the player
 */
export function isPartOf3InARow(button, playerPlacedPiecesCollection) {
    for (let i = 0; i < Piece3Combinations.length; i++) {
        if (Piece3Combinations[i].includes(button)) {
            // check if all 3 keys are owned by player
            if (playerPlacedPiecesCollection[Piece3Combinations[i][0]].owned &&
                playerPlacedPiecesCollection[Piece3Combinations[i][1]].owned &&
                playerPlacedPiecesCollection[Piece3Combinations[i][2]].owned) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Removes the piece of the selected player from the board.
 * @param button HTMLElement
 * @param itsPlayer1sTurn boolean
 * @param playerPlacedPiecesCollection {{}}
 * @returns {void}
 */
export function removeThePieceFromTheBoard(button, itsPlayer1sTurn, playerPlacedPiecesCollection) {
    const classNameToBeRemoved = itsPlayer1sTurn ? 'owned-by-player2' : 'owned-by-player1';
    button.classList.remove(classNameToBeRemoved);
    playerPlacedPiecesCollection[button.classList[1]].owned = false;
}

/**
 * Adds the piece of the selected player to the board.
 * @param button HTMLElement
 * @param itsPlayer1sTurn boolean
 * returns {void}
 */
export function colorTheButton(button, itsPlayer1sTurn) {
    if (itsPlayer1sTurn) {
        // remove a class
        button.classList.remove('owned-by-player2');
        // add a class
        button.classList.add('owned-by-player1');
    } else {
        // remove a class
        button.classList.remove('owned-by-player1');
        // add a class
        button.classList.add('owned-by-player2');
    }
}

/**
 * Adds the piece of the selected player to the board
 * @param button HTMLElement
 * @param playerPlacedPiecesCollection {{}}
 * @returns {void}
 */
export function addButtonToOwned(button, playerPlacedPiecesCollection) {
    playerPlacedPiecesCollection[button.classList[1]].owned = true;
    playerPlacedPiecesCollection[button.classList[1]].row = button.classList[1][10];
    playerPlacedPiecesCollection[button.classList[1]].col = button.classList[1][15];
}

/**
 * Checks if the player has 3 pieces in a row.
 * @param playerMovesHistory
 * @param playerPlacedPiecesCollection
 * @returns {boolean}
 */
export function checkFor3PiecesInARow(playerMovesHistory, playerPlacedPiecesCollection) {
    // check for 3 in a row
    const lastButtonClicked = playerMovesHistory[playerMovesHistory.length - 1];

    // check if the current key is in the Piece3Combinations
    for (let i = 0; i < Piece3Combinations.length; i++) {
        if (Piece3Combinations[i].includes(lastButtonClicked)) {
            // check if all 3 keys are owned
            if (playerPlacedPiecesCollection[Piece3Combinations[i][0]].owned &&
                playerPlacedPiecesCollection[Piece3Combinations[i][1]].owned &&
                playerPlacedPiecesCollection[Piece3Combinations[i][2]].owned) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks the state based on the following parameters:
 * @param ItsPhase2 boolean
 * @param waitingForMovement boolean
 * @param currentlyRemovingAPiece boolean
 * @param itsPlayer1sTurn boolean
 * @returns {number} which is the state of the game
 */
export function checkAndReturnGameState(ItsPhase2, waitingForMovement, currentlyRemovingAPiece, itsPlayer1sTurn) {
    // Phase2
    // -------------------------------------------------------------------------------------------
    // player2 moves the piece to a new position
    if (ItsPhase2 && waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn) {
        return 8;
        // player1 moves the piece to a new position
    } else if (ItsPhase2 && waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn) {
        return 7;
        // click on players2's own piece to select for movement
    } else if (ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn) {
        return 6;
        // click on players1's own piece to select for movement
    } else if (ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn) {
        return 5;

        // Phase1
        // -------------------------------------------------------------------------------------------
        // player2 removes a piece
    } else if (!ItsPhase2 && !waitingForMovement && currentlyRemovingAPiece && !itsPlayer1sTurn) {
        return 4;
        // player1 removes a piece
    } else if (!ItsPhase2 && !waitingForMovement && currentlyRemovingAPiece && itsPlayer1sTurn) {
        return 3;
        // player2 places a piece
    } else if (!ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn) {
        return 2;
        // player1 places a piece
    } else if (!ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn) {
        return 1;
    }
}

/**
 * Calculates the possible positions for movement
 * @param button HTMLElement
 * @param player1PlacedPiecesCollection {{}}
 * @param player2PlacedPiecesCollection {{}}
 * @returns {*[]}
 */
export function calculatePossibleMovementPositions(button, player1PlacedPiecesCollection, player2PlacedPiecesCollection) {
    const possibleMovementPositionsList = [];

    // check if the current button is in the Piece3Combinations
    for (let i = 0; i < Piece3Combinations.length; i++) {
        if (Piece3Combinations[i].includes(button)) {
            // check position of the button inside the combination
            const buttonPosition = Piece3Combinations[i].indexOf(button);

            // check if the button on the right is free and existing
            if(buttonPosition !== 2){
                const buttonOnTheRight = Piece3Combinations[i][buttonPosition + 1];
                if(!player1PlacedPiecesCollection[buttonOnTheRight].owned && !player2PlacedPiecesCollection[buttonOnTheRight].owned){
                    // check if not already in the list
                    if(!possibleMovementPositionsList.includes(buttonOnTheRight)){
                        possibleMovementPositionsList.push(buttonOnTheRight);
                    }
                }// check if the button on the left is free and existing
            } else if(buttonPosition !== 0){
                const buttonOnTheLeft = Piece3Combinations[i][buttonPosition - 1];
                if(!player1PlacedPiecesCollection[buttonOnTheLeft].owned && !player2PlacedPiecesCollection[buttonOnTheLeft].owned){
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
