var assert = require('assert');
var InterviewMeet = require('../index.js').InterviewMeet;

describe('Interview Meet', function() {
    describe('#Return24()', function() {
        it('Should return 24', function() {
            assert.strictEqual(InterviewMeet.ReturnTwentyFour(), 24);
        });
    });
});
