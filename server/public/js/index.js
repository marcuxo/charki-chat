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
      console.log("msg_1")
      txt2.innerHTML += `
      <div class="col-12 d-flex justify-content-end">
        <div class="card_msg text-wrap">
          <small class="float-right"><b>${txt.user}</b></small><br>
          <small>${txt.mensage}</small>
        </div>
      </div><br>`
    }else{
      console.log("msg_2")
      txt2.innerHTML += `
      <div class="col-12 d-flex">
        <div class="card_msg text-wrap">
          <small><b>${txt.user}</b></small><br>
          <small>${txt.mensage}</small>
        </div>
      </div><br>`
    }
  });