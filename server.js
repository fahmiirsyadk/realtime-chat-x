const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  // default username , why im using date ?
  // is tricky dude i want unique id every connection created
  var currentdate = new Date()
  socket.username = 'Anonymous ' + currentdate.getDay() + currentdate.getMilliseconds()
  socket.on('disconnect', () => {
    io.emit('disconnect')
    console.log('user disconnected')
  })
  socket.on('chat_message', (data) => {
    io.sockets.emit('chat_message', {message: data.message, username: socket.username})
  })
  socket.on('typing',(data) =>{
    socket.broadcast.emit('typing', {username: socket.username})
  })
})
io.emit('some event', {
    for: 'everyone'
  })

server.listen(4000, () => {
  console.log('The server is running: http://localhost:4000')
})