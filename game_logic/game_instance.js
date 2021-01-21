const fire = require('./ship_methods').fire;

function checkGameStatus(players) {
    return false;
}

function takeTurn(opposingPlayer, guessFunction) {
    let coordinate = guessFunction();
    fire(opposingPlayer, coordinate);
    let gameStatus = checkGameStatus();

    return gameStatus;
}

module.exports = {
    checkGameStatus: checkGameStatus,
    takeTurn: takeTurn
};