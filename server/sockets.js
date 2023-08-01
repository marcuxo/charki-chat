module.exports = io => {
  io.on('connection', (socket) => {
    // console.log(socket.room);
    socket.emit('msg', 'mensage mensageado');
    socket.on('msg1', (txt) => {
      console.log(txt);
      socket.broadcast.emit('msg1',txt)
      socket.emit('msg1',txt)
    });
  });
} 
