    var socket = io();

    socket.on('connect', function() {
        console.log('connect to server');
    })

    socket.on('newMessage', (message) => {
        console.log('new message send:',JSON.stringify(message));
        var li = jQuery('<li></li>');
        li.text(` ${message.from}: ${message.text}`);
        jQuery('#messagesList').append(li);
    });


    jQuery('#myForm').on('submit', function(e){
        e.preventDefault();

        socket.emit('createMessage',{
            from:'User',
            text:jQuery('[name=myMessage]').val()
        },function(response){
            console.log('1 ',response)

        });
    })

    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    })

   