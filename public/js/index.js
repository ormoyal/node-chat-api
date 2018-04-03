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
});


var locationB = jQuery('#sendLocation');
locationB.on('click', function(){
    if(!navigator.geolocation)
        return alert('your browser don\'t support location');
    navigator.geolocation.getCurrentPosition(function (location){
        socket.emit('createLocationMessage',{
            lat: location.coords.latitude,
            long: location.coords.longitude
        });
    },function(err){
        alert('unable to fetch location');
    });
});

socket.on('newLocationMessage', function (locationMessage) {
    var a = jQuery('<a target="_blank">Your On The Map!</a>')
    a.attr('href', locationMessage.url);
    var li = jQuery('<li></li>');
    li.text(locationMessage.from + ': ');
    li.append(a);
    jQuery('#messagesList').append(li);
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

   