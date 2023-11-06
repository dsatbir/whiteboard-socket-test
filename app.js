const express = require("express")
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/',(req,res)=>{
  return res.status(200).json({
    message :"ok"
  })
})

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('chat message', (message) => {
      io.emit('chat message', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });



  
  http.listen(3000, ()=> {
    console.log("Server Running On Port 3000");
})