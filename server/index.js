const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const fs = require('fs')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('port',process.env.PORT || 4581)

app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/vistas/index.html');
});
app.get('/qr', (req, res) => {
  res.sendFile(__dirname + '/vistas/readqr.html');
});
app.get('/mf', (req, res) => {
  res.sendFile(__dirname + '/vistas/multifile.html');
});
/**
 * @param files recive como parametro un archivo
 * el cual lo almacena en la carpeta temporal y luego lo puede usar
 */
app.post('/data', async(req, res)=>{
  const data = req.files.archivos
  const datos = await data.map(arr=>arr.name)
  //console.log(datos)
  fs.writeFileSync('/temp/'+data.name,data[0].data,'base64')
  res.download('/temp/'+data[0].name)
})
/**
 * @param img (corresponde al nombre de imagen tipo string)
 * verifica si existe el nombre de la imagen( sin la extencion ej:.png,.jpg)
 */
app.get('/isimage/:img', async(req, res, next)=>{
  const img = req.params.img;
  console.log(req.headers.host)
  var filer = fs.readdirSync(path.join(__dirname,'/public/imagenes'));
  for (let ff = 0; ff < filer.length; ff++) {
    const ef = filer[ff];
    if(ef.split('.')[0] === img)return res.status(200).json({status: 200, response: 'http://'+req.headers.host+'/imagenes/'+ef})//res.send(`<img src='${"/imagenes/"+ef}'>`)////
  }
  res.status(404).json({status:404, response: 'unmatch'})
});

/**
 * @param undefined aun
 * esta diseñado para verificar un dato antes de pasar a los datos
 * es usable para validar token o headers de autenticacion
 */
app.get('/verifi/:tkn',validate, async(req, res)=>{
  res.json({status:200, response:req.params.tkn})
})
function validate(req, res, next) {
  const aut = req.headers.authorization;
  console.log(aut)
  if(aut === 'paico2021'){
    next()
    return
  }
  else req.user = "unautorized user";
    res.json({status:400, response: req.user})
}

/**
 * pruebas de la funcion next() para validaciones de datos complejos
 */
app.get('/verifi2/:tkn',async(req, res, next)=>{
  if(req.params.tkn == 'marcuxo')res.json({status:200, response:req.params.tkn})
  else next()
})
app.get('/verifi2/:tkn',async(req, res)=>{
  res.json({status:400, response:'unautorized'})
})

require('./sockets')(io);
app.use(express.static(path.join(__dirname, 'public')));

http.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`);
});


