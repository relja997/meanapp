const io = require('socket.io')(3000);


io.on('connection', socket => {
    console.log("A new user connected");
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
        socket.emit('chat-message', message)
    })
})