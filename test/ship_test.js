let expect = require('chai').expect;
describe('SHIP METHOD FUNCTIONS', function () {
    describe('checkForShip', function () {
        let checkForShip = require('../game_logic/ship_methods').checkForShip;
        let ship;

        // We use before to repeat ourselves creating player objects.
        before(function () {
            player = {
                ships: [
                    {
                        locations: [[0, 0], [0, 1]]
                    },
                    {
                        locations: [[5, 5], [6, 5]]
                    }
                ]
            };
        })

        it('should correctly report NO ship at a given players coordinate', function () {
            expect(checkForShip(player, [9, 9])).to.be.false;
        });

        it('should correctly report A ship located at given coordinate', function () {
            expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        });

        it('should handle ships at more than 1 coordinate', function () {
            expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
            expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        });

        it('should handle checking multiple ships', function () {
            expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
            expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
            expect(checkForShip(player, [5, 5])).to.deep.equal(player.ships[1]);
            expect(checkForShip(player, [6, 5])).to.deep.equal(player.ships[1]);
        });
    });

    describe('damageShip', function () {
        let damageShip = require('../game_logic/ship_methods').damageShip;

        it('should register damage on a given ship at a given location', function () {
            let ship = {
                locations: [[0, 0]],
                damage: []
            };
            damageShip(ship, [0, 0]);

            expect(ship.damage).to.not.be.empty;
            expect(ship.damage[0]).to.deep.equal([0, 0]);
        });
    });

    describe('fire', function () {
        let fire = require('../game_logic/ship_methods').fire;
        let player;

        // We use beforeEach when a state gets changed by the tested function, so the object is reset.
        beforeEach(function () {
            player = {
                ships: [
                    {
                        locations: [[0, 0]],
                        damage: []
                    }
                ]
            };
        });

        after(function () {
            console.log('Finished all tests in suite!')
        });

        afterEach(function () {
            console.log('Unit test completed.')
        });

        it('should record damage on given player ship at given coordinates', function () {
            fire(player, [0, 0]);
            expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
        });

        it('should NOT record damage when there is no ship at given coordinates', function () {
            fire(player, [9, 9]);
            expect(player.ships[0].damage).to.be.empty;
        });

        // An example edge case with error handling.
        it('should throw an error if there are more or less than 2 arguments', function () {
            let handler = function () { fire([9, 9]); };
            expect(handler).to.throw(Error);
            expect(handler).to.throw('This function takes 2 arguments, a target player and coordinates.');
        })
    });
});