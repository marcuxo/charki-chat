const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('port', 4581)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/vistas/index.html');
});
app.get('/qr', (req, res) => {
  res.sendFile(__dirname + '/vistas/readqr.html');
});

require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));

http.listen(app.get('port'), () => {
  console.log(`|=> ${app.get('port')}`);
});


