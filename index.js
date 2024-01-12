/**
 * Imports
 * In order to be able to use imports in index.js in index.html, put: type="module" in the script tag:
 * <script type="module" src="index.js"></script>!
 */
import Piece3Combinations from './support/piece3CombinationsList.js';
import createElement from './support/createDomElement.js';
import {
    initializePlayerCollectionsWithOwnedFalse,
    checkAndReturnGameState,
    writeMessageTo,
    isOwnedPieceSelected,
    isPartOf3InARow,
    removeThePieceFromTheBoard,
    colorTheButton,
    addButtonToOwned,
    checkFor3PiecesInARow,
    calculatePossibleMovementPositions
} from './support/functionsCollection.js';

/**
 * Selection of needed elements from the DOM
 * The buttons initially look like: <button class="button button-row1-col4"></button>
 * so their classList[1][10] is the row and classList[1][15] is the column
 * @type {HTMLCollectionOf<Element>}
 */
const buttonsList = document.getElementsByClassName('button');
let infoContainer = document.getElementsByClassName('info-container')[0];
const player1UlOfPieces = document.getElementsByClassName('ul-player1')[0];
const player2UlOfPieces = document.getElementsByClassName('ul-player2')[0];
let player1LiArrayOfPieces = Array.from(player1UlOfPieces.children);
let player2LiArrayOfPieces = Array.from(player2UlOfPieces.children);

/**
 * Global states
 */
let itsPlayer1sTurn = true;
let waitingForMovement = false;
let buttonWaitingForMovement = null;
let currentlyRemovingAPiece = false;
let ItsPhase2 = false;

/**
 * Global collections
 * @type {{}}, key is the 2nd class of the button, i.e. `button-row1-col4` and
 * value is an object with the following properties: owned: boolean, row: string, col: string
 * @type [], list of the buttons that the player has placed, using the 2nd class of the button,
 * i.e. `button-row1-col4`
 */
let player1PlacedPiecesCollection = {};
let player2PlacedPiecesCollection = {};
let player1MovesHistory = [];
let player2MoveHistory = [];

/**
 * Global counters
 */
let player1PiecesLeftToPlace = 9;
let player2PiecesLeftToPlace = 9;

// -------------------------------------------------------------------------------------------
/**
 * Synchronous execution of the following code:
 * 1. Initialize the player collections with the buttons with owned: false
 * 2. Add event listeners to the buttons
 */
initializePlayerCollectionsWithOwnedFalse(buttonsList, player1PlacedPiecesCollection, player2PlacedPiecesCollection);
addEventListenersToButtons(buttonsList);

// -------------------------------------------------------------------------------------------
/**
 * Add event listeners to all the buttons
 * @param buttonsList
 */
function addEventListenersToButtons(buttonsList) {
    for (let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].addEventListener('click', decideWhichFunctionToExecute);
    }
}

/**
 * Decide which function to execute depending on the global states
 * @returns {void}
 */
function decideWhichFunctionToExecute(e) {
    const targetButton = e.target
    const i = Array.from(buttonsList).indexOf(targetButton)
    const gameState = checkAndReturnGameState(ItsPhase2, waitingForMovement, currentlyRemovingAPiece, itsPlayer1sTurn);

    // -------------------------------------------------------------------------------------------
    // ItsPhase2 && waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn
    if (gameState === 7) {
        const possibleMovementPositionsList = calculatePossibleMovementPositions(buttonWaitingForMovement, player1PlacedPiecesCollection, player2PlacedPiecesCollection);
        // check if the clicked button is in the possible movement positions
        if (possibleMovementPositionsList.includes(buttonsList[i].classList[1])) {
            // do actions
            // ToDo
        } else {
            writeMessageTo("Not a possible movement", infoContainer, itsPlayer1sTurn);
        }

        // prepare for next turn
        waitingForMovement = false;
        return;

    // -------------------------------------------------------------------------------------------
    // ItsPhase2 && waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn
    } else if (gameState === 8) {
        const possibleMovementPositionsList = calculatePossibleMovementPositions(buttonWaitingForMovement, player2PlacedPiecesCollection, player1PlacedPiecesCollection);

        // prepare for next turn
        waitingForMovement = false;
        return;
    }

    // -------------------------------------------------------------------------------------------
    // ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn
    else if (gameState === 5) {
        // if clicked on his own piece
        if(isOwnedPieceSelected(buttonsList[i].classList[1], player1PlacedPiecesCollection)) {

            // prepare for next turn
            waitingForMovement = true;
            buttonWaitingForMovement = buttonsList[i].classList[1];
            infoContainer.innerHTML = "Move your piece";
            return;
        }
        return;
    }

    // -------------------------------------------------------------------------------------------
    // ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn
    else if (gameState === 6) {
        // if clicked on his own piece
        if(isOwnedPieceSelected(buttonsList[i].classList[1], player2PlacedPiecesCollection)) {

            // prepare for next turn
            waitingForMovement = true;
            buttonWaitingForMovement = buttonsList[i].classList[1];
            infoContainer.innerHTML = "Move your piece";
            return;
        }
        return;
    }

    // -------------------------------------------------------------------------------------------
    // !ItsPhase2 && !waitingForMovement && currentlyRemovingAPiece && itsPlayer1sTurn
    else if (gameState === 3) {
        // check if the piece is owned by player 2
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player2PlacedPiecesCollection)) {

            // check if it is not a part of a 3 in a row owned by the player so its locked
            if (isPartOf3InARow(buttonsList[i].classList[1], player2PlacedPiecesCollection)) {
                writeMessageTo("Part of 3 in a row", infoContainer, itsPlayer1sTurn);
                return;
            }

            // if not, remove the piece from the board
            removeThePieceFromTheBoard(buttonsList[i], itsPlayer1sTurn, player2PlacedPiecesCollection)

            // prepare for next turn
            itsPlayer1sTurn = !itsPlayer1sTurn;
            writeMessageTo("It's player2's turn", infoContainer, itsPlayer1sTurn);
            currentlyRemovingAPiece = false;
        } else {
            writeMessageTo("Not owned by player 2", infoContainer, itsPlayer1sTurn);
        }
    }

    // -------------------------------------------------------------------------------------------
    // !ItsPhase2 && !waitingForMovement && currentlyRemovingAPiece && !itsPlayer1sTurn
    else if (gameState === 4) {
        // check if the piece is owned by player 1
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player1PlacedPiecesCollection)) {

            // check if it is not a part of a 3 in a row owned by the player so its locked
            if (isPartOf3InARow(buttonsList[i].classList[1], player1PlacedPiecesCollection)) {
                writeMessageTo("Part of 3 in a row", infoContainer, itsPlayer1sTurn);
                return;
            }

            // if not, remove the piece from the board
            removeThePieceFromTheBoard(buttonsList[i], itsPlayer1sTurn, player1PlacedPiecesCollection)

            // prepare for next turn
            itsPlayer1sTurn = !itsPlayer1sTurn;
            writeMessageTo("It's player1's turn", infoContainer, itsPlayer1sTurn);
            currentlyRemovingAPiece = false;
        } else {
            writeMessageTo("Not owned by player 1", infoContainer, itsPlayer1sTurn);
        }
    }

    // -------------------------------------------------------------------------------------------
    // !ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && itsPlayer1sTurn
    else if (gameState === 1) {
        // check if the piece is owned by player 1
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player1PlacedPiecesCollection)) {
            writeMessageTo("Already owned by player 1", infoContainer, itsPlayer1sTurn);
            return;
        }

        // check if the piece is owned by player 2
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player2PlacedPiecesCollection)) {
            writeMessageTo("Already owned by player 2", infoContainer, itsPlayer1sTurn);
            return;
        }

        // if it is not owned, do actions
        colorTheButton(buttonsList[i], itsPlayer1sTurn);
        addButtonToOwned(buttonsList[i], player1PlacedPiecesCollection);

        // update number of pieces left to place
        player1PiecesLeftToPlace--;
        player1UlOfPieces.removeChild(player1LiArrayOfPieces[player1PiecesLeftToPlace]);
        player1MovesHistory.push(buttonsList[i].classList[1]);

        // check if there is a 3 in a row
        if (checkFor3PiecesInARow(player1MovesHistory, player1PlacedPiecesCollection)) {
            currentlyRemovingAPiece = true;
            return;
        }

        // check if phase 2
        if (player1PiecesLeftToPlace === 0 && player2PiecesLeftToPlace === 0) {
            ItsPhase2 = true;
        }

        // prepare for next turn
        itsPlayer1sTurn = !itsPlayer1sTurn;
        writeMessageTo("It's player2's turn", infoContainer, itsPlayer1sTurn);
    }

    // -------------------------------------------------------------------------------------------
    // !ItsPhase2 && !waitingForMovement && !currentlyRemovingAPiece && !itsPlayer1sTurn
    else if (gameState === 2) {
        // check if the piece is owned by player 1
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player1PlacedPiecesCollection)) {
            writeMessageTo("Already owned by player 1", infoContainer, itsPlayer1sTurn);
            return;
        }

        // check if the piece is owned by player 2
        if (isOwnedPieceSelected(buttonsList[i].classList[1], player2PlacedPiecesCollection)) {
            writeMessageTo("Already owned by player 2", infoContainer, itsPlayer1sTurn);
            return;
        }

        // if it is not owned, do actions
        colorTheButton(buttonsList[i], itsPlayer1sTurn);
        addButtonToOwned(buttonsList[i], player2PlacedPiecesCollection);

        // update number of pieces left to place
        player2PiecesLeftToPlace--;
        player2UlOfPieces.removeChild(player2LiArrayOfPieces[player2PiecesLeftToPlace]);
        player2MoveHistory.push(buttonsList[i].classList[1]);

        // check if there is a 3 in a row
        if (checkFor3PiecesInARow(player2MoveHistory, player2PlacedPiecesCollection)) {
            currentlyRemovingAPiece = true;
            return;
        }

        // check if phase 2
        if (player1PiecesLeftToPlace === 0 && player2PiecesLeftToPlace === 0) {
            ItsPhase2 = true;
        }

        // prepare for next turn
        itsPlayer1sTurn = !itsPlayer1sTurn;
        writeMessageTo("It's player1's turn", infoContainer, itsPlayer1sTurn);
    }
}
