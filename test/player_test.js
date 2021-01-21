const expect = require('chai').expect;

describe('PLAYER METHODS', () => {
    describe('validateLocation', () => {
        const validateLocation = require('../game_logic/player_methods.js').validateLocation;
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        locations: [[9, 9]]
                    }
                ]
            };
        });

        it('should confirm VALID for unoccupied locations in range', () => {
            let location = [0, 0];
            let actual = validateLocation(player, location);

            expect(actual).to.be.ok;
        });

        it('should confirm INVALID for occupied locations in range', () => {
            let location = [9, 9];
            let actual = validateLocation(player, location);

            expect(actual).to.be.false;
        });

        it('should confirm INvalid for UNoccupied locations OUT of range', () => {
            let locationHigh = [10, 10];
            let locationLow = [-1, -1];

            expect(validateLocation(player, locationHigh)).to.be.false;
            expect(validateLocation(player, locationLow)).to.be.false;
        });
    });

    describe('validateLocations', () => {
        const validateLocations = require('../game_logic/player_methods.js').validateLocations;
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        locations: [[0, 0]]
                    }
                ]
            };
        });

        it('should correctly report a list of unoccupied locations is valid', () => {
            let locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
            expect(validateLocations(player, locations)).to.be.ok;
        });

        it('should correctly report a a problem if any location in the list is invalid', () => {
            let locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
            expect(validateLocations(player, locations)).to.be.false;

            locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
            expect(validateLocations(player, locations)).to.be.false;
        });
    });

    describe('placeShip', () => {
        const placeShip = require('../game_logic/player_methods.js').placeShip;
        let player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        size: 1,
                        locations: []
                    },
                    {
                        size: 2,
                        locations: [[1, 0], [1, 1]]
                    }
                ]
            };
        });

        it('should update a ship with a valid starting location', () => {
            let ship = player.ships[0];
            let coordinates = [0, 1];

            placeShip(player, ship, coordinates, 'horizontal');
            let actual = ship.locations;

            expect(actual).to.be.ok;
            expect(actual).to.have.length(1);
            expect(actual[0]).to.deep.equal([0, 1]);
        });

        it('should throw an error if no direction is specified', () => {
            let ship = player.ships[0];
            let coordinates = [0, 1];

            let handler = () => { placeShip(player, ship, coordinates); };
            expect(handler).to.throw(Error);
            expect(handler).to.throw('You left out the direction! I need that for math!');
        });
    });
});