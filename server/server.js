const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname + '/../public');

const express = require('express');
const socketIO = require('socket.io');
const app = express();

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users = new Users();


process.env.PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('user connect to server');


	socket.on('join',(params, cb) => {

        if(!isRealString(params.name) || !isRealString(params.room)){
            return cb('name and room are required');
        }

         console.log('8888888888888 ',socket.adapter.rooms);
        console.log('777777777777 ',socket.rooms);

        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

        socket.emit('newMessage', generateMessage('Admin','Welcome to Chat-App'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin','New User Join To The Chat'));


        cb();
    });




	socket.on('createMessage' , (someMessage,cb) => {
	    var user = users.getUser(socket.id);

	    if(user && isRealString(someMessage.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, someMessage.text));
        }
        cb('finish from server');

	});

	socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user)
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.lat, coords.long));
	});

	socket.on('disconnect', () => {
	    console.log('2 ',new Date().getTime());
	    var user = users.removeUser(socket.id);
	    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
	    io.to(user.room).emit('updateUserList', users.getUsersList(user.room));

		console.log('disconnected from browser');
	});

});



server.listen(process.env.PORT, () => {
	console.log(`run on port ${process.env.PORT}`);
});

module.exports = {
	server
};
