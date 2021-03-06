var socket = io();


function scrollToBottom(){
    // Selectors
    var messages = $('#messagesList');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    // console.log('clientHeights ',clientHeights  +' scrollTop ',scrollTop +' scrollHeight ',scrollHeight+'\n newMessageHeight ',newMessageHeight+' lastMessageHeight ',lastMessageHeight);
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
        messages.scrollTop(scrollHeight);

};


socket.on('connect', function() {
    console.log('connect to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('Joining to Chat');
        }
    });


});


socket.on('newMessage', (message) => {

    var formattedTime = moment(message.createdAt).format('HH:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    $('#messagesList').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // li.text(` ${messagedw.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messagesList').append(li);
});


jQuery('#myForm').on('submit', function(e){
    e.preventDefault();
    var textField = jQuery('[name=myMessage]');
    console.log('socket Client ',socket.id);

    socket.emit('createMessage',{
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
    $('[name=myMessage]').focus();
    scrollToBottom();
    // var a = jQuery('<a target="_blank">Your On The Map!</a>')
    // a.attr('href', locationMessage.url);
    // var li = jQuery('<li></li>');
    // li.text(locationMessage.from + '' + formattedTime + ': ');
    // li.append(a);
    // jQuery('#messagesList').append(li);
});


socket.on('updateUserList',function(users){
   console.log('users list ', users);
   var ol = $('<ol></ol>');
   users.forEach(user => {
       ol.append($('<li></li>').text(user));
   });

   $('#users').html(ol);


});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

   