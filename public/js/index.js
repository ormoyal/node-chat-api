var socket = io();

socket.on('connect', function() {
    console.log('connect to server');
})

socket.on('newMessage', (message) => {

    var formattedTime = moment(message.createdAt).format('HH:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });


    $('#messagesList').append(html);



    // var li = jQuery('<li></li>');
    // li.text(` ${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messagesList').append(li);
});


jQuery('#myForm').on('submit', function(e){
    e.preventDefault();
    var textField = jQuery('[name=myMessage]');

    socket.emit('createMessage',{
        from:'User',
        text:textField.val()
    },function(response){
        textField.val('').focus();
        console.log('this message represent ',response)
    });
});


var locationB = jQuery('#sendLocation');
locationB.on('click', function(){
    if(!navigator.geolocation)
        return alert('your browser don\'t support location');
    locationB.attr('disabled', 'disable').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (location){
        socket.emit('createLocationMessage',{
            lat: location.coords.latitude,
            long: location.coords.longitude
        });
        locationB.removeAttr('disabled').text('Send Location');
    },function(err){
        locationB.removeAttr('disabled').text('Send Location');
        alert('unable to fetch location');
    });
});

socket.on('newLocationMessage', function (locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('HH:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: locationMessage.from,
        text: locationMessage.text,
        url: locationMessage.url,
        createdAt: formattedTime
    });

    $('#messagesList').append(html);


    // var a = jQuery('<a target="_blank">Your On The Map!</a>')
    // a.attr('href', locationMessage.url);
    // var li = jQuery('<li></li>');
    // li.text(locationMessage.from + '' + formattedTime + ': ');
    // li.append(a);
    // jQuery('#messagesList').append(li);
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

   