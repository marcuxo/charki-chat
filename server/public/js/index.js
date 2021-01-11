var socket = io();
var formt = document.getElementById('form');
var msgt = document.getElementById('msg');
var usert = document.getElementById('user');
formt.addEventListener('submit', (e)=> {
  e.preventDefault();
  var data = {
    mensage: msgt.value,
    user: usert.value
  }
  socket.emit('msg1', data)
});
socket.on('connection', (chat) => {
  console.log(chat);
});
socket.on('msg1', (txt) => {
    var txt2 = document.getElementById('mensages');
    //console.log(txt.id);
    if(txt.user === usert.value){
      txt2.innerHTML += `<small class="der">${txt.user}</small><br>
      <small class="der">${txt.mensage}</small><br>`
    }else{
      txt2.innerHTML += `<small>${txt.user}</small><br>
      <small>${txt.mensage}</small><br>`
    }
  });