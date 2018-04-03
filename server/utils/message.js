var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt:new Date().getTime()
    }
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getDate()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};