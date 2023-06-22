
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);
let rooms=[]


app.use(express.static(path.join(__dirname, './frontEnd')));


app.get('/',(req, res) => {
  res.sendFile('index.html',{ root: './frontEnd' });
})

io.on('connection', (socket)=>{
console.log("connected");

socket.on("disconnect", () => {
console.log(socket.id);

rooms=rooms.filter((item)=> !item.clientId==socket.id)

});
socket.on("joinRoom",({roomId,name},res)=>{
  const sessionID = socket.id;
 console.log(sessionID);

  rooms.push({roomId:roomId,name:name,clientID:sessionID})
  console.log(rooms);
  socket.join(roomId)
  res({name:name,roomId:roomId})
  var clientNumber = io.sockets.adapter.rooms[roomId].length;
  if(clientNumber==2)
  {
   let memebers= rooms.filter(ele=>{ return ele.roomId==roomId})
   console.log(memebers);
    io.to(roomId).emit('letIn', memebers);
  }
  // io.to(roomId).emit('letIn');
  })


  socket.on('newChatMessage', (req) => {
    
    io.to(req.roomId).emit('newChatMessage',req);

  });



  socket.on('onVideoPlay', (req) => {
    console.log(req);
    io.to(req.roomId).emit('playVideo',req);

  });


  socket.on('setUrl', (req) => {
    console.log(req);
    io.to(req.roomId).emit('setUrl',req);
  });


});


http.listen(4000, function(){
  console.log('listening on *:' + 4000);
});

// http.listen(process.env.PORT, '0.0.0.0');