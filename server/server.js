const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname + '/../public');

const express = require('express');
const socketIO = require('socket.io');
const app = express();

const {generateMessage} = require('./utils/message');


process.env.PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('user connect to server');

    socket.emit('newMessage', generateMessage('Admin','Welcome to Chat-App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Join To The Chat'));


    socket.on('createMessage' , (someMessage) => {
        console.log(`new message: ${JSON.stringify(someMessage)}. At- ${new Date()}`)
        io.emit('newMessage',generateMessage(someMessage.from, someMessage.text));
    })

    socket.on('disconnect', () => {
        console.log('disconnect from browser');
    })

})



server.listen(process.env.PORT, () => {
    console.log(`run on port ${process.env.PORT}`);
})


