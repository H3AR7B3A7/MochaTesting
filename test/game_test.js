let expect = require('chai').expect;

// x To mark all as pending
xdescribe('GAME INSTANCE FUNCTIONS', function(){
    describe('checkGameStatus', function(){
        // Pending test without function
        it('should tell me when the game is over');
    });
    describe('alsoPending', function(){
        // x To mark as pending
        xit('should tell me when the game is over', function(){});
    });
    describe('alsoPending2', function(){
        it('should tell me when the game is over', function(){});
    });
});