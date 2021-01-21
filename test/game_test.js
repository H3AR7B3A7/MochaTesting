let expect = require('chai').expect;

// x To mark all as pending
xdescribe('GAME INSTANCE FUNCTIONS', function () {
    describe('checkGameStatus', function () {
        // Pending test without function
        it('should tell me when the game is over');
    });
    describe('alsoPending', function () {
        // x To mark as pending
        xit('should tell me when the game is over', function () { });
    });
    describe('alsoPending2', function () {
        it('should tell me when the game is over', function () { });
    });

    describe('checkGameStatus2', () => {
        const checkGameStatus = require('../game_logic/game_instance').checkGameStatus;
        it('Should tell me when the game is over', () => {
            let players = [
                {
                    ships: [
                        {
                            locations: [[0, 0]],
                            damage: [[0, 0]]
                        }
                    ]
                }
            ];
            let actual = checkGameStatus(players);
            expect(actual).to.be.false;
        });
    });

    describe('takeTurn', () => {
        const takeTurn = require('../game_logic/game_instance').takeTurn;
        let guess, player;

        beforeEach(() => {
            guess = () => [0, 0];
            player = {
                ships: [
                    {
                        locations: [[0, 0]],
                        damage: []
                    }
                ]
            };
        });

        it('should return false if the game ends', () => {
            let actual = takeTurn(player, guess);
            expect(actual).to.be.false;
        });
    });

    function saveGame(callback) {
        setTimeout(() => {
            callback();
        }, 1000);
    }

    describe('saveGame', () => {
        // Putting an argument on "it()" callback function, makes Mocha aware of an asynchronous functions
        it('Should update save status', (done) => {
            let status = 'Game not saved...';

            saveGame(() => {
                status = 'Game saved!';
                expect(status).to.equal('Game saved!');
                done(); // To tell Mocha when the function is done 
            });
        });
    });
});