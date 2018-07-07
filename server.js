const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
var numClient = 0
io.on('connection', (socket) => {
  var addedClient = false
  var currentdate = new Date()
  socket.username = 'Anonymous ' + currentdate.getDay() + currentdate.getMilliseconds()
  numClient++
  socket.emit('get_data', {
    numClient: numClient
  })
    // BC globaly that some Boiiii connected to our server
    socket.broadcast.emit('user_joined',{
      username : socket.username,
      numClient: numClient
    })

  // chat behavior to self
  socket.on('chat_message', (data) => {
    io.sockets.emit('chat_message', {
      message: data.message,
      username: socket.username
    })
  })
  // typing behavior
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })
  // disconnect info
  socket.on('disconnect', () => {
    numClient--
    socket.broadcast.emit('user_left',{
      username: socket.username,
      numClient: numClient
    })
  })
})

io.emit('some event', {
  for: 'everyone'
})

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})