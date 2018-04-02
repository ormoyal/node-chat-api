    var socket = io();

    socket.on('connect', function() {
        console.log('connect to server');
    })

    socket.on('newMessage', (message) => {
        console.log('new message send:',JSON.stringify(message));
    });

    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    })

   