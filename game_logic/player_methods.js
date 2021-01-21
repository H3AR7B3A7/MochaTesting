const checkForShip = require('./ship_methods.js').checkForShip;
const fire = require('./ship_methods.js').fire;

function validateLocation(player, coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];

    let spaceAvailable = !checkForShip(player, coordinates);

    if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
        return spaceAvailable;
    } else {
        return false;
    }
}

function validateLocations(player, locations) {
    let validated = locations.map(function (location) {
        return validateLocation(player, location);
    });
    return validated.indexOf(false) === -1;
}

function placeShip(player, ship, startingCoordinates, direction) {
    if (!direction) throw Error('You left out the direction! I need that for math!');
    let proposedLocations = [];
    let previousLocation,
        rowNumber,
        columnNumber;

    for (let i = 0; i < ship.size; i++) {
        previousLocation = proposedLocations[i - 1] || [];
        rowNumber = previousLocation[0];
        columnNumber = previousLocation[1];

        proposedLocations[i] = (i === 0)
            ? startingCoordinates
            : (direction === 'horizontal')
                ? [rowNumber, ++columnNumber]
                : [++rowNumber, columnNumber];
    }

    if (validateLocations(player, proposedLocations)) {
        ship.locations = proposedLocations;
    } else {
        return false;
    }
}

function getRandomCoordinate() {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    return [x, y];
}

function getRandomDirection() {
    let direction = Math.random() > 0.5
        ? 'horizontal'
        : 'vertical';
}

// function computerFire (player) {
//   fire(player, getRandomCoordinate());
// }
// function computerPlaceShip (player, ship) {
//   placeShip(player, ship, getRandomCoordinate(), getRandomDirection());
// }

module.exports = {
    placeShip: placeShip,
    validateLocations: validateLocations,
    validateLocation: validateLocation,
    getRandomCoordinate: getRandomCoordinate,
    getRandomDirection: getRandomDirection
};