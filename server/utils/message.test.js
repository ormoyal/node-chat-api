const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage util', () => {
    it('should return message object', () => {
        var message = generateMessage('or','hello word');
        expect(message).toMatchObject({
            from:'or',
            text:"hello word"
        });
        expect(typeof message.createdAt).toBe('number');
        expect(typeof message.createdAt).not.toBe('string');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location link', () => {
        var lat = 31.262706599999994, long = 34.788496599999995;
        locationMessage = generateLocationMessage('Admin',lat,long);
        expect(locationMessage).toMatchObject({
            from:'Admin',
            url:`https://google.com/maps?q=${lat},${long}`
        });
        expect(typeof locationMessage.createdAt).toBe('number')
    });
});