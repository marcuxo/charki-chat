var socket = io();
var formt = document.getElementById('btn-send');
var msgt = document.getElementById('msg');
var usert = document.getElementById('user');
var cont_msg = document.getElementById('cont_msg')

const formatScroll = () => {
  var cont_msg = document.getElementById('cont_msg')
  console.log(cont_msg.scrollHeight,cont_msg.clientHeight);
  cont_msg.scrollTop = cont_msg.scrollHeight - cont_msg.clientHeight;
}

formt.addEventListener('click', (e)=> {
  // e.preventDefault();
  if(msgt.value !== ''){
    var data = {
      mensage: msgt.value,
      user: usert.value
    }
    socket.emit('msg1', data)
    msgt.value = ''
    
    formatScroll()
  }
  return

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
      formatScroll()
    }else{
      cont_msg.scrollTop = cont_msg.scrollHeight;
      console.log("msg_2")
      txt2.innerHTML += `
      <div class="col-12 d-flex">
        <div class="card_msg text-wrap">
          <small><b>${txt.user}</b></small><br>
          <small>${txt.mensage}</small>
        </div>
      </div><br>`
      formatScroll()
    }
  });