const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage util', () => {
    it('should return message object', () => {
        var message = generateMessage('or','hello word');

        expect(message).toMatchObject({
            from:'or',
            text:"hello word"
        });
        expect(typeof message.createdAt).toBe('number');
        expect(typeof message.createdAt).not.toBe('string');
        
        
    })
})